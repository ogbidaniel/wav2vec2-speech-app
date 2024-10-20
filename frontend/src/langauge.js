// fetch('/api/languages')
//   .then(response => response.json())
//   .then(data => {
//     // Populate dropdown
//   });
// language.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/languages')
    .then(response => response.json())
    .then(data => {
      const languageSelect = document.getElementById('language-select');
      data.languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.textContent = language.name;
        languageSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching languages:', error));
});
