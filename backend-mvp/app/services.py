import hashlib
from datetime import datetime
from flask import current_app, request, jsonify
from functools import wraps

def compute_cv_score(media_uri: str) -> float:
    """Deterministic pseudo-AI score 0..1 based on media_uri (MVP placeholder)."""
    if not media_uri:
        return 0.2
    h = hashlib.sha1(media_uri.encode("utf-8")).hexdigest()
    v = (int(h[:8], 16) % 1000) / 1000.0
    return 0.4 + 0.55 * v  # 0.4..0.95

def compute_verifiability_score(has_gps: bool, cv_score: float, quantity: float) -> float:
    base = 0.2 + (0.3 if has_gps else 0.0) + (0.5 * cv_score)
    if quantity and quantity > 0:
        base += 0.05
    return min(0.99, round(base, 3))

def compute_tco2e(practice_type: str, quantity: float) -> float:
    factors = current_app.config["CARBON_FACTORS"]
    factor = factors.get(practice_type, 0.0)
    qty = max(0.0, float(quantity or 0.0))
    return round(factor * qty, 4)

def require_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        key = request.headers.get("X-Admin-Key")
        if key != current_app.config.get("ADMIN_API_KEY"):
            return jsonify(error="Unauthorized"), 401
        return f(*args, **kwargs)
    return wrapper

def attestation_hash(lot_id: int, total_tco2e: float, buyer_name: str) -> str:
    payload = f"{lot_id}|{total_tco2e}|{buyer_name}|{datetime.utcnow().isoformat()}"
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()

def mock_mpesa_txn(phone: str, amount_kes: float) -> str:
    seed = f"{phone}|{amount_kes}|{datetime.utcnow().timestamp()}"
    h = hashlib.md5(seed.encode("utf-8")).hexdigest()[:10].upper()
    return f"MPESA-SBX-{h}"
