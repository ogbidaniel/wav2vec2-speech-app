// // Fetch English text
// fetch('/api/english_texts')
//   .then(response => response.json())
//   .then(data => {
//     // Display text for translation
//   });

// // Submit contribution
// function submitContribution(translatedText, audioBlob) {
//   const formData = new FormData();
//   formData.append('text', translatedText);
//   formData.append('audio', audioBlob);

//   fetch('/api/contribute', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => {
//     // Handle response
//   });
// }

// contribute.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/english_texts')
    .then(response => response.json())
    .then(data => {
      document.getElementById('english-text').textContent = data.text;
      window.textId = data.id;
    })
    .catch(err => console.error('Error fetching text:', err));
});

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

// Submit Contribution
document.getElementById('submit-contribution-btn').addEventListener('click', () => {
  const translatedText = document.getElementById('translated-text').value;

  if (!translatedText) {
    alert('Please enter your translation.');
    return;
  }

  if (!window.recordedAudio) {
    alert('Please record your audio.');
    return;
  }

  const formData = new FormData();
  formData.append('translated_text', translatedText);
  formData.append('audio', window.recordedAudio);
  formData.append('text_id', window.textId);

  // Get Firebase ID token
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      fetch('/api/contribute', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          alert('Thank you for your contribution!');
          // Reset the form or fetch a new text
          document.getElementById('translated-text').value = '';
          window.recordedAudio = null;
        })
        .catch(err => console.error('Error submitting contribution:', err));
    })
    .catch(err => console.error('Error getting ID token:', err));
});
