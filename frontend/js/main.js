import ASRHandler from './asrHandler.js';
import TTSHandler from './ttsHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const asrHandler = new ASRHandler();
    const ttsHandler = new TTSHandler();

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
});
