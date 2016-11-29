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
      backgroundURL = './books.jpg'
    } else if (hashHistory.getCurrentLocation().pathname == "/data") {
      backgroundURL = "./spacex.jpg";
    } else {
      backgroundURL = './capitolHill.jpg'
    }
    return (
      <div>
        <div style={{height: '300px', position: 'relative'}}>  
            <Layout style={{background: 'url('+ backgroundURL + ') center / cover'}}>  
            <Header transparent title="Stories" style={{color: 'white'}}  className="navLink">
              <Navigation>
                <Link className="navLink" to='/'>Stories</Link>
                <Link className="navLink" to='/data'>Data</Link>
                <Link className="navLink" to='/help'>Get Involved</Link>
              </Navigation>         
            </ Header>
            {/* make this p element render conditionally depending on the current page*/ }
            <p>Informing people one story at a time</p>
          </Layout>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
