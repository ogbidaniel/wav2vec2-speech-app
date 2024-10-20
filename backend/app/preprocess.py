import librosa

def preprocess_audio(file_path):
    y, sr = librosa.load(file_path, sr=None)
    # Perform normalization or other preprocessing
    return processed_audio