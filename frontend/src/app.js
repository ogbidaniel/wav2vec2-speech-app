document.getElementById('audio_data').addEventListener('click', function () {
    document.getElementById('audioInput').click();
});

document.getElementById('submitButton').addEventListener('click', function () {
    const audioFile = document.getElementById('audioInput').files[0];
    const language = document.getElementById('languageDropdown').value;

    if (!audioFile || !language) {
        alert('Please select a language and upload an audio file');
        return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('language', language);

    fetch('http://localhost:5000/submit', { // Assuming Flask backend
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.transcription;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing the audio.');
    });
});

document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('audioInput').value = '';
    document.getElementById('output').textContent = '';
    document.getElementById('languageDropdown').selectedIndex = 0;
});
