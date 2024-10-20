// Fetch English text
fetch('/api/english_texts')
  .then(response => response.json())
  .then(data => {
    // Display text for translation
  });

// Submit contribution
function submitContribution(translatedText, audioBlob) {
  const formData = new FormData();
  formData.append('text', translatedText);
  formData.append('audio', audioBlob);

  fetch('/api/contribute', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    // Handle response
  });
}