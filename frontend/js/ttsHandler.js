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

    async synthesizeSpeech() {
        const text = this.ttsInput.value;
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
            this.ttsPlayer.src = audioUrl;
            this.ttsAudioBox.classList.remove('hidden');
        } catch (error) {
            console.error('Error synthesizing speech:', error);
        }
    }

    downloadAudio() {
        const audioSrc = this.ttsPlayer.src;
        if (!audioSrc) return;

        const a = document.createElement('a');
        a.href = audioSrc;
        a.download = 'synthesized_speech.wav';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

export default TTSHandler;