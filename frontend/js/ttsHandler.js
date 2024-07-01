class TTSHandler {
    constructor() {
        this.ttsInput = document.getElementById('tts-input');
        this.synthesizeBtn = document.getElementById('synthesize-btn');
        this.ttsAudioBox = document.getElementById('tts-audio');
        this.ttsPlayer = document.getElementById('tts-player');
        this.downloadAudioBtn = document.getElementById('download-audio');

        this.init();
    }

    init() {
        this.synthesizeBtn.addEventListener('click', () => this.synthesizeSpeech());
        this.downloadAudioBtn.addEventListener('click', () => this.downloadAudio());
    }

    showLoadingIndicator() {
        document.getElementById('loading-indicator').classList.remove('hidden');
    }
    
    hideLoadingIndicator() {
        document.getElementById('loading-indicator').classList.add('hidden');
    }

    async synthesizeSpeech() {
        const text = this.ttsInput.value.trim();
        if (!text) {
            alert('Please enter some text to synthesize.');
            return;
        }
        
        this.showLoadingIndicator();

        try {
            const response = await fetch('/api/synthesize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            this.ttsPlayer.src = audioUrl;
            this.ttsAudioBox.classList.remove('hidden');
        } catch (error) {
            console.error('Error synthesizing speech:', error);
            alert('Failed to synthesize speech. Please try again later.');
        } finally {
            this.hideLoadingIndicator();
        }
    }

    downloadAudio() {
        const audioSrc = this.ttsPlayer.src;
        if (!audioSrc) {
            alert('No audio available to download. Please synthesize speech first.');
            return;
        }

        const a = document.createElement('a');
        a.href = audioSrc;
        a.download = 'synthesized_speech.wav';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

export default TTSHandler;