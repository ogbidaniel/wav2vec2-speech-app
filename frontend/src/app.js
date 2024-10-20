// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// document.addEventListener('DOMContentLoaded', () => {
//   // Setup event listeners and initialize the app
// });
// app.js

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ... other config values
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to load HTML components into a target element
function loadComponent(url, targetId) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(targetId).innerHTML = html;
      if (targetId === 'header') {
        // Initialize header events after loading
        initHeaderEvents();
      }
    })
    .catch(err => console.error(`Error loading ${url}: ${err}`));
}

// Load header and footer components
loadComponent('components/header.html', 'header');
loadComponent('components/footer.html', 'footer');

// Load the home page by default
loadComponent('components/home.html', 'content');

// Function to initialize header events
function initHeaderEvents() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = event.target.getAttribute('data-page');
      loadComponent(`components/${page}.html`, 'content');
    });
  });

  // Include authentication script
  const authScript = document.createElement('script');
  authScript.src = 'auth.js';
  document.body.appendChild(authScript);
}

// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  const authLink = document.getElementById('auth-link');
  if (authLink) {
    if (user) {
      authLink.textContent = 'Logout';
      authLink.onclick = () => firebase.auth().signOut();
    } else {
      authLink.textContent = 'Login';
      authLink.onclick = () => showLoginModal();
    }
  }
});

// Function to show login modal (to be implemented)
function showLoginModal() {
  alert('Login functionality not yet implemented.');
}
