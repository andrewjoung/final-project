import React, { Component } from 'react';
import {MenuItem} from 'react-bootstrap';
import {Textfield} from 'react-mdl';
import _STATES from './states.js';
import _REPS from './repData.js';
import _ from 'lodash';
import './getInvolved.css';
// have the page initially be "how to get involved" 
// search bar with dropdown menus, so you can search by state, counties, etc... 
import './App.css';

// renders a page with states for representatives
class GetInvolved extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      states: _STATES,
      selectedState:''
    };
  }

  // renders description and list of states to search 
  render() {
    return (
        <div>
          <div className="secondLayer">
            <div className="helpIntroduction">
              <h1> Here is what you could do to help </h1>
              <p> Let your voice be heard. </p>
              <p> If you have been touched or inspired by the stories you've seen today, </p>
              <p> step up and help work towards equality. </p>
              <p> Let your state representatives know the types of change you would like to see. </p>
            </div>
            <div className="organizations">
              <StateSearch listOfStates={this.state.states} />
            </div>  
          </div>
        </div>
    );
  }
}

// renders specific list of states and state search 
class StateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord:'',
      labelDisplay:'Select your state',
      stateSelected:false
    }
    this.handleTyping = this.handleTyping.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //handles typing of states 
  handleTyping(event) {
    this.setState({searchWord:event.target.value});
  }

  //handles clicking on states to show information 
  handleClick(selectedState) {
    this.setState({labelDisplay:selectedState, stateSelected:true, searchWord:''});
  }

  //renders the states that are typed and displayed. 
  render() {
    if (this.state.searchWord !== '') {
      var filterWord = this.state.searchWord;
      var filteredStates = this.props.listOfStates.filter(function(aState){
        return aState.substring(0, filterWord.length).toLowerCase() === filterWord.toLowerCase();
      })
      var that = this;
      var statesToDisplay= filteredStates.map(function(matchingState) {
        return <State stateName={matchingState} key={matchingState} clickCallback={that.handleClick}/>
      });
    }

    if(this.state.stateSelected) {
      var representatives = _REPS;
      var stateUsed = this.state.labelDisplay
      var filteredReps = representatives.filter(function(repObj){
        return repObj.statename.toLowerCase() === stateUsed.toLowerCase();
      });
      var groupedReps = Object.keys(_.groupBy(filteredReps, 'name'));
      var groupedRepsObj = Object(_.groupBy(filteredReps, 'name'));
      var rep = groupedReps.map(function(representative){
        return <SingleRep repName={representative} repObj={groupedRepsObj} />
      });
    }

    return(
      <div>
        <div className="searchIntro" aria-live="polite">
          <p> Contact your state Representatives and lets work towards a better tomorrow, together. </p>
          <Textfield
            onChange={this.handleTyping}
            label={this.state.labelDisplay}
            floatingLabel
            style={{width: '60%'}}
          />
        </div>
        {statesToDisplay}
        <div>
          {rep}
        </div>
      </div>
    );
  }
}

  //renders specific states. g
class State extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.clickCallback(this.props.stateName);
  }

  render() {
    var name = this.props.stateName;
    return(
      <MenuItem onClick={this.handleClick} > {name} </MenuItem> 
    );
  }
}

//renders single name of representives. 
class SingleRep extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('hello');
    var representativeObj = this.props.repObj;
    var repName = this.props.repName;
    var info = representativeObj[repName].map(function(infoArray){
      return <RepInfo infoToUse={infoArray} />
    });
    return(
      <div>
        <h1> {this.props.repName} </h1>
       {info}
      </div>
    );
  }
}

  //renders information of representives. 
class RepInfo extends React.Component {
  render() {
    var phoneNum = this.props.infoToUse.phone;
    return(
      <div className='repInfo'>
        <p className="repContent"> office: {this.props.infoToUse.officename} </p>
        <p className="repContent"> address: {this.props.infoToUse.officeaddress} </p>
        <p className="repContent"> phone number:<a href="tel:+"phoneNum> {this.props.infoToUse.phone}</a> </p>
      </div>
    );
  }
}

export { State };
export default GetInvolved;
