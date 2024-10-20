// Sign-in function
function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
      })
      .catch(error => {
        // Handle Errors
      });
  }
  