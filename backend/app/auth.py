import firebase_admin
from firebase_admin import auth, credentials
from functools import wraps
from flask import request, jsonify

cred = credentials.Certificate(Config.FIREBASE_CONFIG)
firebase_admin.initialize_app(cred)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            decoded_token = auth.verify_id_token(token)
            current_user = decoded_token['uid']
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorator