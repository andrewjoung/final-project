import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation } from 'react-mdl';
import { Link, hashHistory } from 'react-router';

class App extends React.Component {
  render() {
    // should update to be in the state
    var backgroundURL = "";
    if(hashHistory.getCurrentLocation().pathname == "/") {
      backgroundURL = "http://www.getmdl.io/assets/demos/transparent.jpg"
    } else if (hashHistory.getCurrentLocation().pathname == "/data") {
      backgroundURL = "";
    } else {
      backgroundURL = "";
    }
    return (
      <div style={{height: '300px', position: 'relative'}}>  
          <Layout style={{background: 'url('+ backgroundURL + ') center / cover'}}>  
          <Header transparent title="The post election informative" style={{color: 'white'}}>
            <Navigation>
              <Link to='/'>Stories</Link>
              <Link to='/data'>Data</Link>
              <Link to='/help'>Get Involved</Link>
            </Navigation>
          </ Header>
        </Layout>
        {this.props.children}
      </div>
    );
  }
}

export default App;
