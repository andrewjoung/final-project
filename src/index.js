import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GetInvolved from './GetInvolved';
import DataPage from './DataPage';
import StoriesPage from './StoriesPage';
import AdminPage, {LoginPage} from './AdminPage';
import firebase from 'firebase';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


var config = {
  apiKey: "AIzaSyDYIT2x9mIRDK9_DPwtv2-B-wCAinfYrvU",
  authDomain: "final-727e2.firebaseapp.com",
  databaseURL: "https://final-727e2.firebaseio.com",
  storageBucket: "final-727e2.appspot.com",
  messagingSenderId: "834057190458"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={StoriesPage} />
      <Route path="data" component={DataPage}/>
      <Route path="help" component={GetInvolved}/>
      <Route path="login" component={LoginPage}/>
      <Route path="mods" component={AdminPage}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
