from flask import Blueprint, request, jsonify
from app.auth import token_required
from app.inference import transcribe_audio, synthesize_speech
from app.models import db, Contribution

api_bp = Blueprint('api', __name__)

@api_bp.route('/transcribe', methods=['POST'])
@token_required
def transcribe(current_user):
    audio_file = request.files['audio']
    # Preprocess and transcribe
    transcript = transcribe_audio(audio_file.read())
    return jsonify({'transcript': transcript})

@api_bp.route('/contribute', methods=['POST'])
@token_required
def contribute(current_user):
    text = request.form['text']
    audio_file = request.files['audio']
    # Save to S3 and database
    contribution = Contribution(...)
    db.session.add(contribution)
    db.session.commit()
    return jsonify({'message': 'Contribution received'})