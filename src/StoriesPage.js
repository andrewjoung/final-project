import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import {Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton, Menu, MenuItem, Snackbar, Dialog, DialogContent, DialogTitle, DialogActions, Textfield, Badge} from 'react-mdl';
var _ = require('lodash');


class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      searchValue: ""
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  componentDidMount() {
    var thisComponent = this;
    var storiesRef = firebase.database().ref('stories/');
    storiesRef.on('value', (snapshot) => {
      var storiesArray = [];
      snapshot.forEach(function (childSnapshot) {
        var storyObj = childSnapshot.val();
        storyObj.key = childSnapshot.key;
        storiesArray.push(storyObj);
      });
      _.reverse(storiesArray); // displays most recent stories first
      storiesArray = _.slice(storiesArray, 0, 15);
      thisComponent.setState({ stories: storiesArray })
    });
  }

  componentWillUnMount() {
    firebase.database().ref('stories/').off();
  }

  handleClick(tagName, randomize){
    this.setState({stories: []})
    var storiesRef = firebase.database().ref('stories/');
    storiesRef.on('value', (snapshot) => {
      var storiesArray = [];
      snapshot.forEach(function (childSnapshot){
        var storyObj = childSnapshot.val();
        storyObj.key = childSnapshot.key;
        if (tagName == "") {
          storiesArray.push(storyObj);
        } else {
          if (storyObj.tags) {
            tagName = tagName.toLowerCase();
            var tagsString = storyObj.tags;
            var tagsArray = tagsString.split(",");
            var processedTags = tagsArray.map(function(tag) {
              var trimmed = tag.trim();
              var lower = trimmed.toLowerCase();
              return lower;            
            });
            if (processedTags.includes(tagName)) {
              storiesArray.push(storyObj);
            }
          }
        }
      })
      if (randomize) {
        storiesArray = _.shuffle(storiesArray); // randomizes the array of stories
      } else {
        _.reverse(storiesArray); // displays most recent stories first
      }
      this.setState({stories: storiesArray});
    })
  }

  handleTyping(event) {
    this.setState({searchValue: event.target.value})
  }

  render() {
    var content = <div></div>
    if (this.state.stories.length == 0) {
      content = <p>Sorry, no stories with that tag were found!</p>
    }
    var i = -1;
    var storiesArray = this.state.stories.map(function(story) {
      i++;
      return <Story key={i} content={story.content} title={story.title} storyKey={story.key} author={story.poster}/>
    }, i);
    return (  
      <div>
        <div className="smaller" >
          <IconButton id="filter" name="filter_list" className="shareLink navLink" onClick={this.handleShareLink} aria-label="Share your story" />
          <Menu target="filter" align="left">
            <MenuItem onClick={this.componentDidMount}>Most Recent </ MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'black', false)}>Black </MenuItem >
            <MenuItem onClick={this.handleClick.bind(this, 'latino', false)}>Latino </MenuItem >
            <MenuItem onClick={this.handleClick.bind(this, 'muslim', false)}>Muslim </MenuItem >
            <MenuItem onClick={this.handleClick.bind(this, 'lgbtq', false)}>LGBTQ </MenuItem >
            <MenuItem onClick={this.handleClick.bind(this, "", true)}>Randomize</MenuItem >
          </Menu> 
          <Textfield
              label="Tag search"
              floatingLabel
              style={{width: '75%'}}
              onChange={this.handleTyping}
          />
          <IconButton raised ripple className="button" name="search"onClick = {this.handleClick.bind(this, this.state.searchValue, false)} />
        </div>
        <div className = "navWrap" >
          <Button raised ripple className="button" onClick = {this.componentDidMount} >Most Recent</Button>
          <Button raised ripple className="button" onClick = {this.handleClick.bind(this, 'black', false)}>Black</Button>
          <Button raised ripple className="button" onClick = {this.handleClick.bind(this, 'latino', false)}>Latino</Button>
          <Button raised ripple className="button" onClick = {this.handleClick.bind(this, 'lgbtq', false)}>LGBTQ</Button>
          <Button raised ripple className="button" onClick = {this.handleClick.bind(this, 'muslim', false)}>Muslim</Button>
          <Button raised ripple className="button" onClick = {this.handleClick.bind(this, "", true)}>Randomize</Button>
        </div>
        <div className = "navWrap" >
          <Textfield
              label="Tag search"
              floatingLabel
              style={{width: '60%'}}
              onChange={this.handleTyping}
          />
          <IconButton raised ripple className="button" name="search"onClick = {this.handleClick.bind(this, this.state.searchValue, false)} /> 
        </div>
        <div className="mainContent">
          {content}
          {storiesArray}         
        </div>
      </div>
    );
  }
}

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReportModal: false,
      reportJustification: "",
      showSnackBar: false,
      coloredLike: false
    }  
    this.handleTyping = this.handleTyping.bind(this);
    this.displayReportDialog = this.displayReportDialog.bind(this);
    this.closeReportDialog = this.closeReportDialog.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.handleLike = this.handleLike.bind(this);
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
  
  handleTimeoutSnackbar() {
    this.setState({showSnackBar: false});
  }

  handleReport() {
    var storyRef = firebase.database().ref('stories/' + this.props.storyKey);
    storyRef.update({
      reported: true
    });
    var reportsRef = firebase.database().ref('reportedStories/');
    var reportedStory = {
      storyKey: this.props.storyKey,
      justification: this.state.reportJustification,
      reportTime: firebase.database.ServerValue.TIMESTAMP,
      storyContent: this.props.content
    } 
    reportsRef.push(reportedStory);
    this.setState({showSnackBar: true, showReportModal: false});
  }

  handleLike() {
    var storyRef = firebase.database().ref('stories/' + this.props.storyKey);
    if (this.state.coloredLike == false ) { 
      this.setState({coloredLike: true});
      storyRef.transaction(function(story) {
        if (story) {
          story.likes++;
        }
        return story;
      }); 
    } else { 
      this.setState({coloredLike: false});
      storyRef.transaction(function(story) {
        if (story) {
          story.likes--;
        }
        return story;
      });  
    }   
  }

  componentWillUnMount() {
    firebase.database().ref('stories/' + this.props.storyKey).off();
  }

  render() {
    var storyID = this.props.storyKey;
    var disableReport; 
    
    if (!this.state.reportJustification || this.state.reportJustification == "") {
      disableReport = true;
    } else {
      disableReport = false;
    }
    
    return(
      <div className="cardDiv">
        <Card className="card" shadow={0} style={{width: '100%', margin: 'auto'}}>
          <CardTitle style={{color: 'black', height: '75px'}}>{this.props.title}</CardTitle>
          <CardText>
            {this.props.content} -- {this.props.author}
          </CardText>
          <CardMenu style={{color: 'gray'}}>
            <IconButton name="thumb_up" onClick={this.handleLike} colored={this.state.coloredLike}/>
            <IconButton name="settings" id={storyID}/>
            <Menu target={storyID} align="right">
              <MenuItem onClick={this.displayReportDialog}>Report</MenuItem>
            </Menu>
          </CardMenu>
        </Card>
        <Dialog open={this.state.showReportModal} style={{width: '75%'}}>
            <DialogTitle>Report post</DialogTitle>
              <DialogContent>
                <p>We take reports very seriously.  Please justify your report below.</p>
                 <Textfield
                    label="Report details"
                    floatingLabel
                    style={{width: '100%'}}
                    onChange={this.handleTyping}
                    rows={7}
                />
                <DialogActions>
                  <Button onClick={this.handleReport} disabled={disableReport} raised colored>Send Report</Button>
                  <Button onClick={this.closeReportDialog}>Cancel</Button>
                </DialogActions>
              </DialogContent>
          </Dialog>
          <Snackbar
            active={this.state.showSnackBar}
            onTimeout={this.handleTimeoutSnackbar}
          >
            <span >Thank you for reporting this story</span>
          </Snackbar>       
      </div>
      );
  }
}

export default StoriesPage;