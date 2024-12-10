# app.py

from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api_bp
from firebase_admin import credentials, initialize_app

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Firebase Admin SDK
cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS)
initialize_app(cred)

# Initialize extensions
db.init_app(app)
CORS(app)

# Register blueprints
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)