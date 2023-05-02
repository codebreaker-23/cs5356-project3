// This uses the pre-built login form
import { StyledFirebaseAuth } from 'react-firebaseui';
// This imports firebase using the Firebase SDK v8 style
import firebase from 'firebase/compat/app'
// This imports the Firebase Auth libraries
import 'firebase/compat/auth'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
