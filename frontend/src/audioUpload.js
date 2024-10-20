// // Recording audio
// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     const mediaRecorder = new MediaRecorder(stream);
//     // Handle recording events
//   });

// audioUpload.js

let mediaRecorder;
let audioChunks = [];

// Start Recording
document.getElementById('record-btn').addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      audioChunks = [];

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        window.recordedAudio = audioBlob;
      });

      document.getElementById('record-btn').disabled = true;
      document.getElementById('stop-btn').disabled = false;
    })
    .catch(err => console.error('Error accessing microphone:', err));
});

// Stop Recording
document.getElementById('stop-btn').addEventListener('click', () => {
  mediaRecorder.stop();
  document.getElementById('record-btn').disabled = false;
  document.getElementById('stop-btn').disabled = true;
});

// Transcribe Audio
document.getElementById('transcribe-btn').addEventListener('click', () => {
  const languageCode = document.getElementById('language-select').value;
  let audioFile;

  // Check if audio is uploaded or recorded
  if (document.getElementById('audio-upload').files.length > 0) {
    audioFile = document.getElementById('audio-upload').files[0];
  } else if (window.recordedAudio) {
    audioFile = window.recordedAudio;
  } else {
    alert('Please upload or record an audio file.');
    return;
  }

  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('language', languageCode);

  fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('transcribed-text').textContent = data.transcript;
    })
    .catch(err => console.error('Error during transcription:', err));
});

// Synthesize Speech
document.getElementById('synthesize-btn').addEventListener('click', () => {
  const languageCode = document.getElementById('language-select').value;
  const text = document.getElementById('tts-text').value;

  if (!text) {
    alert('Please enter text to synthesize.');
    return;
  }

  fetch('/api/synthesize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language: languageCode }),
  })
    .then(response => response.blob())
    .then(blob => {
      const audioURL = URL.createObjectURL(blob);
      document.getElementById('synthesized-audio').src = audioURL;
    })
    .catch(err => console.error('Error during synthesis:', err));
});
