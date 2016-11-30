import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation, Dialog, DialogContent, DialogTitle, DialogActions, Textfield, Button } from 'react-mdl';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareModal: false
    };
    this.handleShareLink = this.handleShareLink.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.postToFirebase = this.postToFirebase.bind(this);
  }

  handleShareLink() {
    this.setState({
      showShareModal: true
    });
  }

  closeModal() {
    this.setState({
      showShareModal: false
    })
  }

  handleTyping(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  
  postToFirebase() {
    var user = "";
    if (!this.state.username) {
      user = "Anonymous" 
    } else {
      user = this.state.username;
    }
    var storyData= {
      content: this.state.story,
      poster: user,
      likes: 0,
      reported: false
    }
    if (this.state.tags) {
      storyData.tags = this.state.tags;
    }
    var storiesRef = firebase.database().ref('stories/');
    storiesRef.push(storyData);
    // add a "thanks for sharing!" modal thing
    this.setState({showShareModal: false})
  }
  
  render() {
    var disableShare;
    if (!this.state.story || this.state.story == "") {
      disableShare = true;
    } else {
      disableShare = false;
    }
    var backgroundURL = "";
    var content = "";
    if(hashHistory.getCurrentLocation().pathname === "/") {
      backgroundURL = './books.jpg'
    } else if (hashHistory.getCurrentLocation().pathname === "/data") {
      backgroundURL = "./spacex.jpg";
    } else {
      backgroundURL = './capitolHill.jpg'
    }
    return (
      <div>
        <div style={{height: '300px', position: 'relative'}}>
            <div className="layout">  
            <Layout style={{background: 'url('+ backgroundURL + ') center / cover'}}>
            <div className="head">  
            <Header transparent title="Fabella" className="navLink">
              <Navigation>
                <Link className="navLink" to='/'>Stories</Link>
                <a className="shareLink navLink" onClick={this.handleShareLink}> Share </a>
                <Link className="navLink" to='/data'>Data</Link>
                <Link className="navLink" to='/help'>Get Involved</Link>
              </Navigation>         
            </ Header>
            </div>
            {/* make this p element render conditionally depending on the current page*/ }
            {/*<p>Informing people one story at a time</p>*/}
          </Layout>
          </div>
          <Dialog open={this.state.showShareModal}>
            <DialogTitle>Share your story!</DialogTitle>
              <DialogContent>
                <p>We'd love to hear your story.</p>
                <Textfield
                    onChange={() => {}}
                    label="Username..."
                    floatingLabel
                    style={{width: '200px'}}
                    name="username"
                    onChange={this.handleTyping}
                />
                <Textfield
                    onChange={() => {}}
                    label="Story..."
                    floatingLabel
                    style={{width: '200px'}}
                    name="story"
                    onChange={this.handleTyping}
                />
                <Textfield
                    onChange={() => {}}
                    label="Tags..."
                    floatingLabel
                    style={{width: '200px'}}
                    name="tags"
                    onChange={this.handleTyping}
                />
                <Button onClick={this.closeModal}>Cancel</Button>
                <Button onClick={this.postToFirebase} disabled={disableShare}>Share!</Button>
              </DialogContent>
          </Dialog>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
