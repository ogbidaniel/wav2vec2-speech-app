// // Sign-in function
// function signIn(email, password) {
//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         // Signed in
//       })
//       .catch(error => {
//         // Handle Errors
//       });
//   }
// auth.js

function updateAuthLink(user) {
  const authLink = document.getElementById('auth-link');
  if (user) {
    authLink.textContent = 'Logout';
    authLink.onclick = () => firebase.auth().signOut();
  } else {
    authLink.textContent = 'Login';
    authLink.onclick = () => showLoginModal();
  }
}

// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  updateAuthLink(user);
});

// Function to show login modal
function showLoginModal() {
  // Implement your login modal here
  alert('Login modal not implemented.');
}

// Example sign-in function
function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      updateAuthLink(userCredential.user);
    })
    .catch((error) => {
      console.error('Error signing in:', error);
    });
}
