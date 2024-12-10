# routes/api.py

from flask import request, jsonify
from . import api_bp
from models import db, Language, Contribution
from auth import token_required

# Endpoint to get the list of supported languages
@api_bp.route('/api/languages', methods=['GET'])
def get_languages():
    languages = Language.query.all()
    languages_list = [{'code': lang.code, 'name': lang.name} for lang in languages]
    return jsonify({'languages': languages_list})

# Endpoint to handle audio transcription
@api_bp.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    # For testing purposes, return a dummy transcription
    return jsonify({'transcript': 'This is a dummy transcription.'})

# Endpoint to handle speech synthesis
@api_bp.route('/api/synthesize', methods=['POST'])
def synthesize_speech():
    # For testing purposes, return a dummy audio file
    from flask import send_file
    # Create or use an existing dummy audio file
    return send_file('path/to/dummy_audio.wav', mimetype='audio/wav')

# Endpoint to fetch English text for translation
@api_bp.route('/api/english_texts', methods=['GET'])
def get_english_text():
    # For testing purposes, return a static text
    return jsonify({'id': 'text_id_1', 'text': 'Please translate this sentence.'})

# Endpoint to handle user contributions
@api_bp.route('/api/contribute', methods=['POST'])
@token_required
def submit_contribution(current_user):
    translated_text = request.form.get('translated_text')
    audio_file = request.files.get('audio')
    text_id = request.form.get('text_id')
    language_code = request.form.get('language_code')

    # For simplicity, let's assume the language_id is 1
    language = Language.query.filter_by(code=language_code).first()
    if not language:
        return jsonify({'message': 'Invalid language code.'}), 400

    # Save audio file to a local directory or S3 (omitted for brevity)
    audio_url = 'path/to/saved/audio.wav'

    # Save the contribution to the database
    contribution = Contribution(
        user_id=current_user,
        language_id=language.id,
        audio_url=audio_url,
        text=translated_text
    )
    db.session.add(contribution)
    db.session.commit()

    return jsonify({'message': 'Contribution received.'})
