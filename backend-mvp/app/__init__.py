from flask import Flask, jsonify
from .config import Config
from .extensions import db, migrate, cors
from .api.v1.routes import bp as api_v1
from flasgger import Swagger

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    Swagger(app)  # Swagger UI at /apidocs/

    app.register_blueprint(api_v1)

    @app.get("/")
    def root():
        return jsonify(message="Climate Credits API ready"), 200

    return app
