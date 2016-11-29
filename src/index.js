import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDYIT2x9mIRDK9_DPwtv2-B-wCAinfYrvU",
  authDomain: "final-727e2.firebaseapp.com",
  databaseURL: "https://final-727e2.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "834057190458"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
