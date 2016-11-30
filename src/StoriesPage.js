import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'; 

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
      return <Story content={story.content} />
    });
    //console.log(this.state);
    console.log(storiesArray);
    return (<div>{storiesArray}</div>);
  }
}

// render the first 10 or 15 stories from firebase, and then have a big "banner"
// at the bottom that serves as the link to the Data page
// also include the ability for the user to read more stories....
class Story extends React.Component {
  render() {
    return(<p>{this.props.content}</p>);
  }
}

export { Story };
export default StoriesPage;