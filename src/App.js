import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Layout, Header, Navigation, Dialog, DialogContent,
  DialogTitle, DialogActions, Textfield, Button, Snackbar, IconButton, Tooltip,
FABButton, Icon, Menu, MenuItem, Footer, FooterSection, FooterLinkList}
  from 'react-mdl';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
//import {Header } from 'material-design-lite';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareModal: false,
      showSnackBar: false
    };
    this.handleShareLink = this.handleShareLink.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.postToFirebase = this.postToFirebase.bind(this);
  }

  // shows the "share modal" when "share" in nav bar is clicked
  handleShareLink() {
    this.setState({
      showShareModal: true
    });
  }

  // closes the "share modal"
  closeModal() {
    this.setState({
      showShareModal: false,
    })
  }

  // closes the snackbar
  handleTimeoutSnackbar() {
    this.setState({ showSnackBar: false });
  }

  // updates the state of the app based on what the user has typed into 
  // the story modal
  handleTyping(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // sends the story and its relevant information to firebase
  postToFirebase() {
    var user = "";
    if (!this.state.username) {
      user = "Anonymous"
    } else {
      user = this.state.username;
    }
    var storyData = {
      title: this.state.title,
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
    this.setState({ showShareModal: false, showSnackBar: true });
  }

  render() {
    // disables the share button when a story has not been typed 
    var disableShare;
    if ((!this.state.story || this.state.story == "") || (!this.state.title || this.state.title == "")) {
      disableShare = true;
    } else {
      disableShare = false;
    }
    // changes background image depending on current route
    var backgroundURL = "";
    var content = "";
    if (hashHistory.getCurrentLocation().pathname === "/") {
      backgroundURL = './books.jpg'
    } else if (hashHistory.getCurrentLocation().pathname === "/data") {
      backgroundURL = "./spacex.jpg";
    } else if (hashHistory.getCurrentLocation().pathname === "/help") {
      backgroundURL = './capitolHill.jpg'
    } else {
      backgroundURL = './rocks.jpg'
    }
    return (
      <div>
        <div style={{ height: '300px', position: 'relative' }}>
          <div className="layout">
            <Layout style={{ background: 'url(' + backgroundURL + ') center / cover' }}>
              <div className="navWrapper">
                <h1 className ="mobileHeader">Fabella</h1>
                <div className="head">
                  <Header transparent title={<Link className="navLink" to='/'>Fabella</Link>} className="mdl-layout mdl-js-layout mdl-layout--fixed-header" className="navLink">
                    <Navigation>
                      <Link className="navLink" to='/'>Stories</Link>
                      <Link className="navLink" to='/data'>Data</Link>
                      <Link className="navLink" to='/help'>Get Involved</Link>
                      <Tooltip label="Share your story!">
                        <IconButton name="message" className="shareLink navLink" onClick={this.handleShareLink} aria-label="Share your story" />
                      </Tooltip>
                    </Navigation>      
                  </Header>
                </div>
              </div>
              {/* this div below has to be outside of actual header tag becase we render 
                  the images, then the display on of the header, then our punch line*/}
              {/*<p>Informing people one story at a time</p>*/}
              <div className ="headliner"> 
                    <p className = "headliner">Educating the world, post election, one story at a time.</p>
              </div>
            </Layout>
            
          </div>
          <p class="headliner">Educating the world, post election, one story at a time.</p>
          <Dialog open={this.state.showShareModal} style={{ width: '75%'}}>
            <DialogTitle>Share your story!</DialogTitle>
              <DialogContent>
                <p>We'd love to hear your story.</p>
                <Textfield
                    label="Display Name"
                    floatingLabel
                    style={{width: '100%'}}
                    name="username"
                    onChange={this.handleTyping}
                />
              <Textfield
                label="Title"
                floatingLabel
                style={{ width: '100%' }}
                name="title"
                onChange={this.handleTyping}
                />
                <Textfield
                    label="Story"
                    floatingLabel
                    style={{width: '100%'}}
                    name="story"
                    onChange={this.handleTyping}
                    rows={7}
                    placeholder="Feel free to share your experiences about identity, politics, or living in America. We simply ask that your story promotes understanding and equality."
                />
                <Textfield
                    label="Tags"
                    floatingLabel
                    style={{width: '100%'}}
                    name="tags"
                    onChange={this.handleTyping}
                    placeholder="A comma separated list, e.g. Black, Latino, LGBTQ, Muslim"
                />
              <DialogActions>
                <Button onClick={this.postToFirebase} disabled={disableShare} raised colored>Share!</Button>
                <Button onClick={this.closeModal}>Cancel</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Snackbar
            active={this.state.showSnackBar}
            onTimeout={this.handleTimeoutSnackbar}
            >
            <span className="snackBarText">Thank you for sharing your story!</span>
          </Snackbar>
        </div>
        {this.props.children}
        <div className="mobileNav">
          <FABButton colored ripple id="navButton" aria-label="Navigation">
            <Icon name="navigation"/>
          </FABButton>
          <Menu target="navButton" valign="top" align="right">
            <MenuItem><Link className="navLink" to='/'>Stories</Link></MenuItem>
            <MenuItem><Link className="navLink" to='/data'>Data</Link></MenuItem>
            <MenuItem><Link className="navLink" to='/help'>Get Involved</Link></MenuItem>
            <MenuItem onClick={this.handleShareLink}>Share</MenuItem>
          </Menu>
        </div>
        <Footer size="mini">
          <FooterSection type="left" logo="Fabella">
            <FooterLinkList>
              <a href="https://github.com/andrewjoung/final-project/">Code</a>
              <Link to="/login">Admin Portal</Link>
            </FooterLinkList>
            <p>A website created by Andrew Joung, Dominick Tavitian, Scott Kinders, and Adam Bourn</p>
          </FooterSection>
        </Footer>
      </div>
    );
  }
}

export default App;
