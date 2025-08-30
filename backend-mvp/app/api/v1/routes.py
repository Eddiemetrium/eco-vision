from flask import Blueprint, request, jsonify, Response, current_app
from datetime import datetime, date
from ...extensions import db
from ...models import Coop, Farmer, FarmPlot, PracticeEvent, CreditUnit, CreditLot, Buyer, Payout
from ...services import (
    compute_cv_score, compute_verifiability_score, compute_tco2e,
    require_admin, attestation_hash, mock_mpesa_txn
)

bp = Blueprint("api_v1", __name__, url_prefix="/api/v1")

@bp.get("/health")
def health():
    return jsonify(status="ok"), 200

# ---------- Farmers & Plots ----------
@bp.post("/farmers")
def create_farmer():
    data = request.get_json() or {}
    name = data.get("name")
    phone = data.get("phone")
    coop_name = data.get("coop_name")
    if not (name and phone):
        return jsonify(error="name and phone required"), 400

    coop = None
    if coop_name:
        coop = Coop.query.filter_by(name=coop_name).first()
        if not coop:
            coop = Coop(name=coop_name)
            db.session.add(coop)

    farmer = Farmer(name=name, phone=phone, coop=coop)
    db.session.add(farmer)
    db.session.commit()
    return jsonify(farmer=farmer.to_dict()), 201

@bp.post("/plots")
def create_plot():
    data = request.get_json() or {}
    farmer_id = data.get("farmer_id")
    if not farmer_id:
        return jsonify(error="farmer_id required"), 400
    plot = FarmPlot(
        farmer_id=farmer_id,
        county=data.get("county"),
        soil_class=data.get("soil_class"),
        centroid_lat=(data.get("centroid") or {}).get("lat"),
        centroid_lng=(data.get("centroid") or {}).get("lng"),
        boundary_geojson=data.get("boundary_geojson"),
    )
    db.session.add(plot)
    db.session.commit()
    return jsonify(plot=plot.to_dict()), 201

# ---------- Practice Events -> Credit Units ----------
@bp.post("/events")
def log_practice_event():
    data = request.get_json() or {}
    plot_id = data.get("plot_id")
    ptype = data.get("type")
    if not (plot_id and ptype):
        return jsonify(error="plot_id and type required"), 400

    the_plot = FarmPlot.query.get(plot_id)
    if not the_plot:
        return jsonify(error="plot not found"), 404

    # date
    dt = data.get("date")
    try:
        d = date.fromisoformat(dt) if dt else date.today()
    except Exception:
        d = date.today()

    media_uri = data.get("media_uri")
    gps = data.get("gps") or {}
    quantity = float(data.get("quantity") or 0)

    cv = compute_cv_score(media_uri)
    vscore = compute_verifiability_score(bool(gps.get("lat") and gps.get("lng")), cv, quantity)
    tco2e = compute_tco2e(ptype, quantity)

    event = PracticeEvent(
        plot_id=plot_id, type=ptype, date=d, media_uri=media_uri,
        gps_lat=gps.get("lat"), gps_lng=gps.get("lng"),
        quantity=quantity, ai_cv_score=cv, verifiability_score=vscore, status="pending"
    )
    db.session.add(event)
    db.session.flush()

    unit = CreditUnit(
        farmer_id=the_plot.farmer_id, plot_id=plot_id, practice_id=event.id,
        tco2e=tco2e, status="provisional"
    )
    db.session.add(unit)
    db.session.flush()

    event.credit_unit_id = unit.id
    db.session.commit()

    return jsonify(event=event.to_dict(), credit_unit=unit.to_dict()), 201

@bp.post("/events/<int:event_id>/verify")
@require_admin
def verify_event(event_id: int):
    data = request.get_json() or {}
    decision = (data.get("decision") or "").lower()
    event = PracticeEvent.query.get(event_id)
    if not event:
        return jsonify(error="event not found"), 404
    unit = CreditUnit.query.get(event.credit_unit_id)

    if decision == "approve":
        event.status = "verified"
        if unit:
            unit.status = "verified"
    elif decision == "reject":
        event.status = "rejected"
        if unit:
            unit.status = "provisional"
    else:
        return jsonify(error="decision must be approve|reject"), 400

    db.session.commit()
    return jsonify(event=event.to_dict(), credit_unit=unit.to_dict() if unit else None), 200

# ---------- Pooling ----------
@bp.post("/lots/pool")
@require_admin
def pool_lot():
    threshold = float(
        (request.get_json() or {}).get("threshold_tco2e")
        or current_app.config["LOT_THRESHOLD_TCO2E"]
    )
    units = CreditUnit.query.filter_by(status="verified", lot_id=None).order_by(CreditUnit.id.asc()).all()
    total = 0.0
    selected = []
    for u in units:
        selected.append(u)
        total += u.tco2e
        if total >= threshold:
            break
    if total < threshold:
        return jsonify(error="not enough verified credits to reach threshold",
                       available_total=round(total, 4), threshold=threshold), 400

    lot = CreditLot(total_tco2e=round(total, 4), status="ready")
    db.session.add(lot)
    db.session.flush()
    for u in selected:
        u.lot_id = lot.id
        u.status = "issued"
    db.session.commit()
    return jsonify(lot=lot.to_dict(), unit_count=len(selected)), 201

@bp.get("/lots")
def list_lots():
    lots = CreditLot.query.order_by(CreditLot.id.desc()).all()
    return jsonify(lots=[l.to_dict() for l in lots]), 200

# ---------- Buyer purchase & attestation ----------
@bp.post("/buyers/purchase")
def buyer_purchase():
    data = request.get_json() or {}
    lot_id = data.get("lot_id")
    if not lot_id:
        return jsonify(error="lot_id required"), 400
    lot = CreditLot.query.get(lot_id)
    if not lot or lot.status != "ready":
        return jsonify(error="lot not in ready state"), 400

    buyer_info = data.get("buyer") or {}
    buyer = Buyer(
        name=buyer_info.get("name", "Buyer"),
        email=buyer_info.get("email"),
        company=buyer_info.get("company")
    )
    db.session.add(buyer)
    db.session.flush()

    price = float(data.get("price_per_tco2e_kes") or current_app.config["PRICE_PER_TCO2E_KES"])
    gross = round(price * lot.total_tco2e, 2)
    lot.buyer_id = buyer.id
    lot.price_per_tco2e_kes = price
    lot.gross_amount_kes = gross
    lot.status = "sold"
    lot.sold_at = datetime.utcnow()
    lot.attestation_hash = attestation_hash(lot.id, lot.total_tco2e, buyer.name)
    db.session.commit()

    return jsonify(
        receipt={
            "lot": lot.to_dict(),
            "buyer": buyer.to_dict(),
            "receipt_hash": lot.attestation_hash,
            "note": "MVP mock purchase; hash is a transparency anchor only."
        }
    ), 201

@bp.get("/lots/<int:lot_id>/receipt")
def lot_receipt(lot_id: int):
    lot = CreditLot.query.get(lot_id)
    if not lot or not lot.attestation_hash:
        return jsonify(error="receipt not found"), 404
    return jsonify(
        lot=lot.to_dict(),
        receipt_hash=lot.attestation_hash,
        integrity="hash payload: lot_id|total_tco2e|buyer_name|timestamp (MVP mock)"
    ), 200

# ---------- Payouts (mock Daraja) ----------
@bp.post("/payouts/run")
@require_admin
def run_payouts():
    data = request.get_json() or {}
    lot_id = data.get("lot_id")
    if not lot_id:
        return jsonify(error="lot_id required"), 400
    lot = CreditLot.query.get(lot_id)
    if not lot or lot.status != "sold":
        return jsonify(error="lot must be in sold state"), 400

    farmer_totals = {}
    for u in lot.units:
        farmer_totals[u.farmer_id] = farmer_totals.get(u.farmer_id, 0.0) + u.tco2e

    farmer_share = float(current_app.config["FARMER_SHARE"])
    per_ton_price = float(lot.price_per_tco2e_kes or current_app.config["PRICE_PER_TCO2E_KES"])

    payouts = []
    for farmer_id, tco2e in farmer_totals.items():
        amount = round(tco2e * per_ton_price * farmer_share, 2)
        farmer = Farmer.query.get(farmer_id)
        txn = mock_mpesa_txn(farmer.phone, amount)
        p = Payout(farmer_id=farmer_id, lot_id=lot.id, amount_kes=amount, mpesa_txn=txn, status="success")
        db.session.add(p)
        payouts.append(p)

    lot.status = "paid"
    db.session.commit()
    return jsonify(
        lot=lot.to_dict(),
        payouts=[x.to_dict() for x in payouts],
        note="MVP sandbox payout; no real Daraja call."
    ), 201

# ---------- Farmer wallet ----------
@bp.get("/farmers/<int:farmer_id>/wallet")
def wallet_view(farmer_id: int):
    units = CreditUnit.query.filter_by(farmer_id=farmer_id).all()
    sums = {"provisional": 0.0, "verified": 0.0, "issued": 0.0}
    for u in units:
        sums[u.status] = round(sums.get(u.status, 0.0) + u.tco2e, 4)
    kes_est = round(
        (sums["issued"] + sums["verified"]) * current_app.config["PRICE_PER_TCO2E_KES"] * current_app.config["FARMER_SHARE"],
        2
    )
    return jsonify(farmer_id=farmer_id, tco2e=sums, est_withdrawable_kes=kes_est), 200

# ---------- USSD (Africa's Talking style) ----------
@bp.post("/ussd")
def ussd():
    """Africa's Talking USSD webhook (MVP) — returns text/plain."""
    session_id = request.values.get("sessionId")
    phone = request.values.get("phoneNumber")
    text = (request.values.get("text") or "").strip()

    parts = [p for p in text.split("*") if p]

    def reply(msg, cont=True):
        prefix = "CON " if cont else "END "
        return Response(prefix + msg, mimetype="text/plain")

    if not parts:
        return reply("Karibu Climate Credits:\n1. Register\n2. Log practice\n3. Wallet")

    # 1) Register
    if parts[0] == "1":
        if len(parts) == 1:
            return reply("Enter your name:")
        if len(parts) == 2:
            name = parts[1].strip()
            farmer = Farmer.query.filter_by(phone=phone).first()
            if farmer:
                return reply("You are already registered.", cont=False)
            farmer = Farmer(name=name, phone=phone)
            db.session.add(farmer)
            db.session.commit()
            return reply("Registered. Dial again to log practice or view wallet.", cont=False)

    # 2) Log practice
    if parts[0] == "2":
        farmer = Farmer.query.filter_by(phone=phone).first()
        if not farmer:
            return reply("You are not registered. Choose 1 first.", cont=False)
        if len(parts) == 1:
            return reply("Choose practice:\n1. Agroforestry\n2. Cover crop")
        if len(parts) == 2:
            return reply("Enter quantity (trees or seasons):")
        if len(parts) == 3:
            choice = parts[1]
            qty_str = parts[2]
            try:
                qty = float(qty_str)
            except Exception:
                qty = 0.0
            ptype = "agroforestry" if choice == "1" else "cover_crop"
            plot = farmer.plots[0] if farmer.plots else None
            if not plot:
                plot = FarmPlot(farmer_id=farmer.id)
                db.session.add(plot)
                db.session.flush()

            event = PracticeEvent(
                plot_id=plot.id, type=ptype, date=datetime.utcnow().date(),
                media_uri=None, gps_lat=None, gps_lng=None, quantity=qty,
                ai_cv_score=compute_cv_score(""),
                verifiability_score=compute_verifiability_score(False, 0.2, qty),
                status="pending"
            )
            db.session.add(event)
            db.session.flush()

            unit = CreditUnit(
                farmer_id=farmer.id, plot_id=plot.id, practice_id=event.id,
                tco2e=compute_tco2e(ptype, qty), status="provisional"
            )
            db.session.add(unit)
            db.session.flush()

            event.credit_unit_id = unit.id
            db.session.commit()
            return reply(f"Logged. Event #{event.id} created. Awaiting verification.", cont=False)

    # 3) Wallet
    if parts[0] == "3":
        farmer = Farmer.query.filter_by(phone=phone).first()
        if not farmer:
            return reply("You are not registered. Choose 1 first.", cont=False)
        units = farmer.credit_units
        prov = round(sum(u.tco2e for u in units if u.status == "provisional"), 4)
        ver = round(sum(u.tco2e for u in units if u.status == "verified"), 4)
        iss = round(sum(u.tco2e for u in units if u.status == "issued"), 4)
        kes = round((ver + iss) * current_app.config["PRICE_PER_TCO2E_KES"] * current_app.config["FARMER_SHARE"], 2)
        return reply(f"tCO2e P:{prov} V:{ver} I:{iss}\nEst KES:{kes}", cont=False)

    return reply("Invalid choice. Dial again.", cont=False)
