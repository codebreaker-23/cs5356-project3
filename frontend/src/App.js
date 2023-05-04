// This uses the pre-built login form
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";

import Home from "./Home";
import Spaces from './Spaces';
import Opportunity from './Opportunity';
import Analytics from './Analytics';

import backgroundImage from "./img2.jpg";

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
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    };
    return (
      <div style={backgroundStyle}>
        <div style={{ fontsize: "10rem", display: "flex", justifyContent: "center", alignItems: "center", height: "20vh" }}>
          <h1>Welcome</h1>
        </div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>

    );
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/spaces"
            element={<Spaces />}
          />
          <Route
            path="/opportunity"
            element={<Opportunity />}
          />
          <Route
            path="/analytics"
            element={<Analytics />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
