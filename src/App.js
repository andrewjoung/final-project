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
      reported: false,
      postTime: firebase.database.ServerValue.TIMESTAMP
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
          <Dialog open={this.state.showShareModal} style={{width: '500px'}}>
            <DialogTitle>Share your story!</DialogTitle>
              <DialogContent>
                <p>We'd love to hear your story.</p>
                <Textfield
                    label="Username..."
                    floatingLabel
                    style={{width: '500px'}}
                    name="username"
                    onChange={this.handleTyping}
                />
              
                <Textfield
                    label="Story..."
                    floatingLabel
                    style={{width: '500px'}}
                    name="story"
                    onChange={this.handleTyping}
                    rows={7}
                    placeholder="Feel free to share your experiences about identity, politics, or living in America. We simply ask that your story promotes understanding and equality."
                />
              
                <Textfield
                    label="Tags..."
                    floatingLabel
                    style={{width: '500px'}}
                    name="tags"
                    onChange={this.handleTyping}
                />
            
                <DialogActions>
                  <Button onClick={this.postToFirebase} disabled={disableShare}>Share!</Button>
                  <Button onClick={this.closeModal}>Cancel</Button>
                </DialogActions>
              </DialogContent>
          </Dialog>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
