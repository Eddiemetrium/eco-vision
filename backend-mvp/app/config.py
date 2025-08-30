import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # MVP carbon factors (rough placeholders for demo only)
    CARBON_FACTORS = {
        "agroforestry": float(os.getenv("FACTOR_AGROFORESTRY", 0.02)),  # tCO2e per tree
        "cover_crop": float(os.getenv("FACTOR_COVER_CROP", 0.15)),      # tCO2e per season
    }

    # Pooling + pricing
    LOT_THRESHOLD_TCO2E = float(os.getenv("LOT_THRESHOLD_TCO2E", 50.0))
    PRICE_PER_TCO2E_KES = float(os.getenv("PRICE_PER_TCO2E_KES", 1200.0))

    # Revenue split
    FARMER_SHARE = float(os.getenv("FARMER_SHARE", 0.75))
    COOP_SHARE = float(os.getenv("COOP_SHARE", 0.15))
    PLATFORM_SHARE = float(os.getenv("PLATFORM_SHARE", 0.10))

    # Admin key for protected endpoints
    ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "change-me-admin-key")

    # Daraja mode (mock only in MVP)
    DARAJA_MODE = os.getenv("DARAJA_MODE", "sandbox")
