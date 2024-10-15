document.addEventListener('DOMContentLoaded', () => {
    // ASR Elements
    const audioUpload = document.getElementById('audio-upload');
    const recordAudioBtn = document.getElementById('record-audio');
    const audioControls = document.getElementById('audio-controls');
    const audioPlayer = document.getElementById('audio-player');
    const transcribeBtn = document.getElementById('transcribe-btn');
    const transcriptionBox = document.getElementById('transcription');
    const transcriptionText = document.getElementById('transcription-text');

    // TTS Elements
    const ttsInput = document.getElementById('tts-input');
    const synthesizeBtn = document.getElementById('synthesize-btn');
    const ttsAudioBox = document.getElementById('tts-audio');
    const ttsPlayer = document.getElementById('tts-player');
    const downloadAudioBtn = document.getElementById('download-audio');

    // ASR Functionality
    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    // Dark Mode Functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    audioUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const audioURL = URL.createObjectURL(file);
            audioPlayer.src = audioURL;
            audioControls.classList.remove('hidden');
        }
    });

    recordAudioBtn.addEventListener('click', toggleRecording);

    transcribeBtn.addEventListener('click', transcribeAudio);

    // TTS Functionality
    synthesizeBtn.addEventListener('click', synthesizeSpeech);
    downloadAudioBtn.addEventListener('click', downloadAudio);

    // ASR Functions
    async function toggleRecording() {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = (e) => {
                    audioChunks.push(e.data);
                };
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioPlayer.src = audioUrl;
                    audioControls.classList.remove('hidden');
                };
                mediaRecorder.start();
                isRecording = true;
                recordAudioBtn.textContent = 'Stop Recording';
                recordAudioBtn.classList.add('recording');
            } catch (err) {
                console.error('Error accessing microphone:', err);
            }
        } else {
            mediaRecorder.stop();
            isRecording = false;
            recordAudioBtn.textContent = 'Record Audio';
            recordAudioBtn.classList.remove('recording');
            audioChunks = [];
        }
    }

    async function transcribeAudio() {
        const audioBlob = await fetch(audioPlayer.src).then(r => r.blob());
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recorded_audio.wav');

        try {
            const response = await fetch('/api/transcribe', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            transcriptionText.textContent = data.transcription;
            transcriptionBox.classList.remove('hidden');
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    }

    // TTS Functions
    async function synthesizeSpeech() {
        const text = ttsInput.value;
        if (!text) return;

        try {
            const response = await fetch('/api/synthesize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            ttsPlayer.src = audioUrl;
            ttsAudioBox.classList.remove('hidden');
        } catch (error) {
            console.error('Error synthesizing speech:', error);
        }
    }

    function downloadAudio() {
        const audioSrc = ttsPlayer.src;
        if (!audioSrc) return;

        const a = document.createElement('a');
        a.href = audioSrc;
        a.download = 'synthesized_speech.wav';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
