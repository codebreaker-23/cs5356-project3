// This uses the pre-built login form
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import React, { useState, useEffect } from "react";
// import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyB8tmIew8Er4CMtkFO0y5Mk8uX4sSnHOMQ",
  authDomain: "milestone3-a3b64.firebaseapp.com",
  projectId: "milestone3-a3b64",
  storageBucket: "milestone3-a3b64.appspot.com",
  messagingSenderId: "348626529212",
  appId: "1:348626529212:web:fbde8392d60013be4319b9"
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      // this gets called whenever a user signs in or out
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome - You are now signed-in!</p>
    </div>
  );
}

export default App;
