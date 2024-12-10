# auth.py

from functools import wraps
from flask import request, jsonify
from firebase_admin import auth as firebase_auth

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Check if the token is passed in the headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Verify the token with Firebase
            decoded_token = firebase_auth.verify_id_token(token)
            current_user = decoded_token['uid']
        except Exception as e:
            print(e)
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated
