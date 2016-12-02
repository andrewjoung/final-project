import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'; 
import {Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton, Menu, MenuItem} from 'react-mdl';

class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    var thisComponent = this;
    var storiesRef = firebase.database().ref('stories/');
    storiesRef.on('value', (snapshot) => {
      var storiesArray = [];
      snapshot.forEach(function(childSnapshot) {
        var storyObj = childSnapshot.val();
        storyObj.key = childSnapshot.key;
        storiesArray.push(storyObj);
      });
      thisComponent.setState({stories: storiesArray})
    });
  }
  
  componentWillUnMount() {
    firebase.database().ref('stories/').off();
  }

  render() {
    var storiesArray = this.state.stories.map(function(story) {
      console.log(story);
      return <Story content={story.content} title={story.title} storyKey={story.key}/>
    });
    //console.log(this.state);
    console.log(storiesArray);
    return (
      <div>
        {storiesArray}           
      </div>
    );
  }
}

// render the first 10 or 15 stories from firebase, and then have a big "banner"
// at the bottom that serves as the link to the Data page
// also include the ability for the user to read more stories....
class Story extends React.Component {
  constructor(props) {
    super(props);
    this.handleReport = this.handleReport.bind(this);  
  }

  handleReport() {
    // take this.props.storyKey to find the story in firebase, 
    // then set the boolean flag "reported" to equal true.
    console.log("handle report of " + this.props.storyKey)
  }

  render() {
    // you'll have to create a new unique id for the like button. 
    // you can use the this.props.storyKey, but maybe hash it with m5 or something?
    var storyID = this.props.storyKey;
    return(
      <div className="cardDiv">
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: 'black', height: '75px'}}>{this.props.title}</CardTitle>
          <CardText>
            {this.props.content}
          </CardText>
          <CardMenu style={{color: 'gray'}}>
            <IconButton name="settings" id={storyID}/>
            <Menu target={storyID} align="right">
              <MenuItem onClick={this.handleReport}>Report</MenuItem>
            </Menu>
          </CardMenu>
        </Card>         
      </div>
      );
  }
}

export default StoriesPage;

/*
 <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
        <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Welcome</CardTitle>
        <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
        </CardText>
        <CardActions border>
            <Button colored>Get Started</Button>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
    </Card> 
*/