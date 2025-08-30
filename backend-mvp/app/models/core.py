from datetime import datetime
from ..extensions import db

class Coop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "name": self.name}

class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    phone = db.Column(db.String(32), unique=True, nullable=False)
    kyc_status = db.Column(db.String(32), default="pending")
    coop_id = db.Column(db.Integer, db.ForeignKey("coop.id"))
    coop = db.relationship("Coop", backref="farmers")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "phone": self.phone, "kyc_status": self.kyc_status,
            "coop": self.coop.to_dict() if self.coop else None
        }

class FarmPlot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey("farmer.id"), nullable=False)
    farmer = db.relationship("Farmer", backref="plots")
    county = db.Column(db.String(80))
    soil_class = db.Column(db.String(80))
    centroid_lat = db.Column(db.Float)
    centroid_lng = db.Column(db.Float)
    boundary_geojson = db.Column(db.Text)  # store as text for MVP
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "farmer_id": self.farmer_id, "county": self.county, "soil_class": self.soil_class,
            "centroid": {"lat": self.centroid_lat, "lng": self.centroid_lng},
            "boundary_geojson": self.boundary_geojson
        }

class PracticeEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plot_id = db.Column(db.Integer, db.ForeignKey("farm_plot.id"), nullable=False)
    plot = db.relationship("FarmPlot", backref="events")
    type = db.Column(db.String(64), nullable=False)  # agroforestry | cover_crop
    date = db.Column(db.Date)
    media_uri = db.Column(db.String(255))
    gps_lat = db.Column(db.Float)
    gps_lng = db.Column(db.Float)
    quantity = db.Column(db.Float, default=0.0)
    ai_cv_score = db.Column(db.Float, default=0.0)
    verifiability_score = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(32), default="pending")  # pending|verified|rejected
    credit_unit_id = db.Column(db.Integer, db.ForeignKey("credit_unit.id"))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "plot_id": self.plot_id, "type": self.type,
            "date": self.date.isoformat() if self.date else None,
            "media_uri": self.media_uri, "gps": {"lat": self.gps_lat, "lng": self.gps_lng},
            "quantity": self.quantity, "ai_cv_score": self.ai_cv_score,
            "verifiability_score": self.verifiability_score,
            "status": self.status, "credit_unit_id": self.credit_unit_id
        }

class CreditUnit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey("farmer.id"), nullable=False)
    farmer = db.relationship("Farmer", backref="credit_units")
    plot_id = db.Column(db.Integer, db.ForeignKey("farm_plot.id"), nullable=False)
    plot = db.relationship("FarmPlot")
    practice_id = db.Column(db.Integer, db.ForeignKey("practice_event.id"), nullable=False)
    practice = db.relationship("PracticeEvent", backref="credit_unit", uselist=False)
    tco2e = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(32), default="provisional")  # provisional|verified|issued
    lot_id = db.Column(db.Integer, db.ForeignKey("credit_lot.id"))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "farmer_id": self.farmer_id, "plot_id": self.plot_id,
            "practice_id": self.practice_id, "tco2e": self.tco2e,
            "status": self.status, "lot_id": self.lot_id
        }

class CreditLot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_tco2e = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(32), default="open")  # open|ready|sold|paid
    buyer_id = db.Column(db.Integer, db.ForeignKey("buyer.id"))
    buyer = db.relationship("Buyer", backref="purchases")
    price_per_tco2e_kes = db.Column(db.Float)
    gross_amount_kes = db.Column(db.Float)
    attestation_hash = db.Column(db.String(128))
    sold_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    units = db.relationship("CreditUnit", backref="lot")

    def to_dict(self):
        return {
            "id": self.id, "total_tco2e": self.total_tco2e, "status": self.status,
            "buyer": self.buyer.to_dict() if self.buyer else None,
            "price_per_tco2e_kes": self.price_per_tco2e_kes,
            "gross_amount_kes": self.gross_amount_kes,
            "attestation_hash": self.attestation_hash,
            "sold_at": self.sold_at.isoformat() if self.sold_at else None
        }

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    email = db.Column(db.String(140))
    company = db.Column(db.String(140))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email, "company": self.company}

class Payout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey("farmer.id"), nullable=False)
    farmer = db.relationship("Farmer")
    lot_id = db.Column(db.Integer, db.ForeignKey("credit_lot.id"), nullable=False)
    lot = db.relationship("CreditLot", backref="payouts")
    amount_kes = db.Column(db.Float, default=0.0)
    mpesa_txn = db.Column(db.String(64))
    status = db.Column(db.String(32), default="success")  # success|failed (mock)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "farmer_id": self.farmer_id, "lot_id": self.lot_id,
            "amount_kes": self.amount_kes, "mpesa_txn": self.mpesa_txn, "status": self.status
        }
