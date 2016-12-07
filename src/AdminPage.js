import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import {hashHistory} from 'react-router';
import {
    Textfield, Dialog, DialogTitle, 
    DialogContent, DialogActions, 
    Button, Card, CardTitle, CardText
} from 'react-mdl';

// loads the AdminPage, which allows moderators to delete and "unreport"
// reported posts.
class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportedStories: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    // updates the state of the component to include all reported stories
    // redirects the user to the moderator login screen if they are not logged in
    componentDidMount() {
        this.unregister = firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
            hashHistory.push('/login');
            }
        });
        var thisComponent = this;
        var reportedStoriesRef = firebase.database().ref('reportedStories/');
        reportedStoriesRef.on('value', (snapshot) => {
            var reportedArray = [];
            snapshot.forEach(function (childSnapshot) {
                var reportedStoryObj = childSnapshot.val();
                reportedStoryObj.key = childSnapshot.key;
                reportedArray.push(reportedStoryObj);
            })
            thisComponent.setState({reportedStories: reportedArray});
        })
    }

    // unregisters firebase listeners 
    componentWillUnMount() { 
        firebase.database().ref('reportedStories/').off();
        this.unregister();
    }

    // signs  out the current user
    signOut() {
        firebase.auth().signOut();
    }

    render() {
        var content = <p></p>;
        if (this.state.reportedStories.length == 0) {
            content = <p className="emptySpaceOffsetFooter">No reports are currently pending</p>
        }
        var reportsComponentArray = this.state.reportedStories.map(function(story) {
            return <ReportedStory reason={story.justification} time={story.reportTime} storyKey={story.storyKey} key={story.key} reportKey={story.key} theStory={story.storyContent}/>
        })
        return (
            <div>
                <Button onClick={this.signOut} raised colored>SignOut</Button>
                {content}
                {reportsComponentArray}
            </div>
        );
    }
}

// renders a single "ReportedStory" component
class ReportedStory extends React.Component {
    constructor(props) {
        super(props);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // updates firebase database to "remove" the story from the 
    // reported "column"
    handleApprove() {
        var reportedStoriesRef = firebase.database().ref('reportedStories/');
        reportedStoriesRef.child(this.props.reportKey).remove();
        var storyRef = firebase.database().ref('stories/' + this.props.storyKey).update({
            reported: false
        });  
    }

    // updates firebase database to remove the reported story from the 
    // entire app
    handleDelete() {
        var reportedStoriesRef = firebase.database().ref('reportedStories/');
        reportedStoriesRef.child(this.props.reportKey).remove();
        var storyRef = firebase.database().ref('/stories');
        storyRef.child(this.props.storyKey).remove();
    }

    render() {
        return(
            <div className="cardDiv">
                <Card className="card" shadow={0} style={{width: '100%', margin: 'auto'}}>
                    <CardTitle style={{color: 'black', height: '75px'}}>Justification</CardTitle>
                    <CardText>
                        {this.props.reason}
                    </CardText>
                    <CardTitle style={{color: 'black', height: '75px'}}>Story in Question</CardTitle>
                    <CardText>
                        {this.props.theStory}
                    </CardText>
                    <div className="responses">
                        <Button raised ripple className="reportResponse" id="deny" onClick={this.handleDelete}>Delete</Button>
                        <Button raised ripple className="reportResponse" id="approve" onClick={this.handleApprove}>Approve</Button>
                    </div>
                </Card>
            </div>
        );
    }
}

// renders the moderator login page
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showModal: false
        }
        this.handleTyping = this.handleTyping.bind(this);
        this.signIn = this.signIn.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    // update the state of the component when a user types their email or password
    handleTyping(event){
        this.setState({[event.target.name]: event.target.value})
    }

    // has firebase authenticate the user, handles logic for displaying an incorrect email/password
    // dialog in those cases
    signIn() {
        var thisComponent = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((firebaseUser) => {
                hashHistory.push('/mods');
            })
            .catch(function(error){
                thisComponent.setState({showModal: true});
            })
    }

    // closes the incorrect email/password dialog
    closeDialog() {
        this.setState({showModal: false})
    }

    render() {
        return (
            <div className="loginPage">
            <h3>Moderator Sign In</h3>
                <Textfield
                    label="Email"
                    floatingLabel
                    style={{width: '75%'}}
                    onChange={this.handleTyping}
                    name="email"
                />
                <Textfield
                    label="Password"
                    floatingLabel
                    style={{width: '75%'}}
                    onChange={this.handleTyping}
                    name="password"
                    type="password"
                />
                <div>
                    <Button onClick={this.signIn} raised colored>Sign in</Button>
                </div>
                <Dialog open={this.state.showModal} style={{width: '75%'}}>
                    <DialogTitle>Wrong email or password</DialogTitle>
                    <DialogContent>
                        <p>Please try again</p>
                    <DialogActions>
                        <Button onClick={this.closeDialog} raised colored>Got it!</Button>
                    </DialogActions>
                    </DialogContent>
                </Dialog>  
            </div>
        );
    }
}

export { LoginPage };
export default AdminPage;