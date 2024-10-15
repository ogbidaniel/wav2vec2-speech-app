const uploadInput = document.getElementById('upload');
const recordButton = document.getElementById('record');
const languageSelect = document.getElementById('language');
const outputDiv = document.getElementById('output');

let recorder, audioChunks = [];

// Function to handle audio file uploads
uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const audioData = e.target.result;
        transcribeAudio(audioData);
    };

    reader.readAsArrayBuffer(file);
});

// Function to handle audio recording
recordButton.addEventListener('click', () => {
    if (!recorder) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (e) => audioChunks.push(e.data);
                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const audioData = e.target.result;
                        transcribeAudio(audioData);
                    };

                    reader.readAsArrayBuffer(audioBlob);
                    audioChunks = [];
                };

                recorder.start();
                recordButton.textContent = 'Stop Recording';
            })
            .catch(err => console.error('Error accessing microphone:', err));
    } else {
        recorder.stop();
        recorder = null;
        recordButton.textContent = 'Start Recording';
    }
});

// Function to transcribe audio using MMS API (replace with your actual API call)
function transcribeAudio(audioData) {
    const language = languageSelect.value;
    outputDiv.textContent = 'Transcribing...';

    // Replace this with your actual MMS API call
    // Example using fetch:
    fetch('/transcribe', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: audioData, language })
    })
    .then(response => response.json())
    .then(data => {
        outputDiv.textContent = data.transcription;
    })
    .catch(err => {
        console.error('Error transcribing audio:', err);
        outputDiv.textContent = 'Error transcribing audio.';
    });
}