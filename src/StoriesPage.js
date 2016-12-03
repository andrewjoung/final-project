import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'; 
import {Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton, Menu, MenuItem, Snackbar, Dialog, DialogContent, DialogTitle, DialogActions, Textfield} from 'react-mdl';

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
      return <Story content={story.content} title={story.title} storyKey={story.key}/>
    });
    return (
      <div>
        {storiesArray}
        <Snackbar
          active={this.state.showSnackBar}
          onTimeout={this.handleTimeoutSnackbar}
        >
          <span className="snackBarText">Thank you for sharing your story!</span>
        </Snackbar>           
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
    this.state = {
      showReportModal: false,
      reportJustification: ""
    }  
    this.handleTyping = this.handleTyping.bind(this);
    this.displayReportDialog = this.displayReportDialog.bind(this);
    this.closeReportDialog = this.closeReportDialog.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleTyping(event) {
    this.setState({reportJustification: event.target.value})
  }

  displayReportDialog() {
    this.setState({showReportModal: true});
  }

  closeReportDialog() {
    this.setState({showReportModal: false});
  }

  handleReport() {

    // then, what you can do is have a separate thing in firebase
    // that is an array of all the reported stories, a justification
    // for that story, and that story's unique firebase ID.  theoretically
    // this could then be inspect by the moderators.
    var storyRef = firebase.database().ref('stories/' + this.props.storyKey);
    storyRef.update({
      reported: true
    });
    var reportsRef = firebase.database().ref('reportedStores/');
    var reportedStory = {
      storyKey: this.props.storyKey,
      justification: this.state.reportJustification,
      reportTime: firebase.database.ServerValue.TIMESTAMP
    } 
    reportsRef.push(reportedStory);
    console.log("handle report of " + this.props.storyKey)
  }

  render() {
    // you'll have to create a new unique id for the like button. 
    // you can use the this.props.storyKey, but maybe hash it with m5 or something?
    var storyID = this.props.storyKey;
    var disableReport; 
    
    if (!this.state.reportJustification || this.state.reportJustification == "") {
      disableReport = true;
    } else {
      disableReport = false;
    }
    
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
              <MenuItem onClick={this.displayReportDialog}>Report</MenuItem>
            </Menu>
          </CardMenu>
        </Card>
        <Dialog open={this.state.showReportModal} style={{width: '500px'}}>
            <DialogTitle>Report post</DialogTitle>
              <DialogContent>
                <p>We take reports very seriously.  Please justify your report below.</p>
                 <Textfield
                    label="Report details"
                    floatingLabel
                    style={{width: '500px'}}
                    onChange={this.handleTyping}
                    rows={7}
                />
                <DialogActions>
                  <Button onClick={this.handleReport} disabled={disableReport} raised colored>Send Report</Button>
                  <Button onClick={this.closeReportDialog}>Cancel</Button>
                </DialogActions>
              </DialogContent>
          </Dialog>       
      </div>
      );
  }
}

export default StoriesPage;