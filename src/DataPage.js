import React, { Component } from 'react';
import './App.css';
import rd3 from 'rd3';
import {DropdownButton, MenuItem, Checkbox, FormGroup} from 'react-bootstrap';

//Instantiate d3 charts
var BarChart = rd3.BarChart;
var PieChart = rd3.PieChart;
//Instantiate questionaire dataset
var barJson = require('./data/islamoutputjson.json');
//Instantiate chosen questions
var questionTextObj = {
	q1: "Q1. How do you rate the community you live in?",
	q2: "Q2. How happy are you?",
	qa1: "Q3. Are you satisfied with the way things are going in this country today?",
	qb2_2: "Q4. Immigrants today strengthen the U.S. because of their hard work and talents",
	qb2_3: "Q5. Most people who want to get ahead can make it if they're willing to work hard",
	qb2_4: "Q6. Homosexuality is a way of life that should be accepted by society",
	qb2_5: "Q7. The government should do more to help needy Americans, even if it means going deeper into debt",
	qb3: "Q8. Do you prefer smaller government and fewer services, or bigger government and more services?",
	qc2: "Q9. U.S. made the right decision by using military force in Iraq",
	qd1: "Q10. Since 9/11, has it become more or less difficult to be Muslim in the U.S.?"
}

//Overall page
class DataPage extends React.Component {
	constructor(props) {
		super(props);
		//Initial state
		//(some values that are "truthy", are set to values
		//higher than one because the dataset is messy)
		this.state = {
			ageMin: 18,
			ageMax: 88,
			male: 1,
			female: 2,
			//education: "all", education is encoded undecipherably in dataset
			white: 1,
			black: 2,
			asian: 3,
			otherRace: 4,
			republican: 1,
			democrat: 2,
			independent: 3,
			noPrefereceParty: 4,
			otherParty: 5,
			noAnswerParty: 6,
			question: "q1",
			windowWidth: window.innerWidth
		}
		//Bind anything that changes state
		this.minAgeChange = this.minAgeChange.bind(this);
		this.maxAgeChange = this.maxAgeChange.bind(this);
		this.maleChange = this.maleChange.bind(this);
		this.femaleChange = this.femaleChange.bind(this);
		this.whiteChange = this.whiteChange.bind(this);
		this.blackChange = this.blackChange.bind(this);
		this.asianChange = this.asianChange.bind(this);
		this.otherRaceChange = this.otherRaceChange.bind(this);
		this.republicanChange = this.republicanChange.bind(this);
		this.democratChange = this.democratChange.bind(this);
		this.independentChange = this.independentChange.bind(this);
		this.noPreferencePartyChange = this.noPreferencePartyChange.bind(this);
		this.otherPartyChange = this.otherPartyChange.bind(this);
		this.noAnswerPartyChange = this.noAnswerPartyChange.bind(this);
		this.questionChange = this.questionChange.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

 	//credit http://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
	//Function to set window width to state variable
	updateDimensions() {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

        this.setState({windowWidth: width});
    }

    //Function for will mount
    componentWillMount() {
        this.updateDimensions();
    }

    //Function for mount
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    //Function for unmount
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    //Function to handle if white race is filtered or not
	whiteChange(event) {
		//if checked, set state to white's "truthy" value (1)
		if (event.target.checked === true) {
			this.setState({white: 1});
		} else {
			this.setState({white: 0});
		}
	}

	//Function to handle if black race is filtered or not
	blackChange(event) {
		//if checked, set state to black's "truthy" value (2)
		if (event.target.checked === true) {
			this.setState({black: 2});
		} else {
			this.setState({black: 0});
		}
	}

	//Function to handle if asian race is filtered or not
	asianChange(event) {
		//if checked, set state to asian's "truthy" value (3)
		if (event.target.checked === true) {
			this.setState({asian: 3});
		} else {
			this.setState({asian: 0});
		}
	}

	//Function to handle if other race is filtered or not
	otherRaceChange(event) {
		//if checked, set state to other race's "truthy" value (4)
		if (event.target.checked === true) {
			this.setState({otherRace: 4});
		} else {
			this.setState({otherRace: 0});
		}
	}

	//Function to handle if other race is filtered or not
	republicanChange(event) {
		//if checked, set state to republican's "truthy" value (1)
		if (event.target.checked === true) {
			this.setState({republican: 1});
		} else {
			this.setState({republican: 0});
		}
	}

	//Function to handle if democrats are filtered or not
	democratChange(event) {
		//if checked, set state to democrat's "truthy" value (2)
		if (event.target.checked === true) {
			this.setState({democrat: 2});
		} else {
			this.setState({democrat: 0});
		}
	}

	//Function to handle if independents are filtered or not
	independentChange(event) {
		//if checked, set state to independent's "truthy" value (3)
		if (event.target.checked === true) {
			this.setState({independent: 3});
		} else {
			this.setState({independent: 0});
		}
	}

	//Function to handle if no party preferers are filtered or not
	noPreferencePartyChange(event) {
		//if checked, set state to no party perferer's "truthy" value (4)
		if (event.target.checked === true) {
			this.setState({noPrefereceParty: 4});
		} else {
			this.setState({noPrefereceParty: 0});
		}
	}

	//Function to handle if other preferers are filtered or not
	otherPartyChange(event) {
		//if checked, set state to other perferer's "truthy" value (5)
		if (event.target.checked === true) {
			this.setState({otherParty: 5});
		} else {
			this.setState({otherParty: 0});
		}
	}

	//Function to handle if no answerers are filtered or not
	noAnswerPartyChange(event) {
		//if checked, set state to no answerer's "truthy" value (5)
		if (event.target.checked === true) {
			this.setState({noAnswerParty: 6});
		} else {
			this.setState({noAnswerParty: 0});
		}
	}

	//Function to handle if males are filtered or not
	maleChange(event) {
		//if checked, set state to male's "truthy" value (5)
		if (event.target.checked === true) {
			this.setState({male: 1});
		} else {
			this.setState({male: 0});
		}
	}

	//Function to handle if females are filtered or not
	femaleChange(event) {
		//if checked, set state to female's "truthy" value (5)
		if (event.target.checked === true) {
			this.setState({female: 2});
		} else {
			this.setState({female: 0});
		}
	}

	//Function to handle setting minimum age for filtering
	minAgeChange(event) {
		//check to be sure that they are setting min to a value
		//lower than the max, if not just ignore their attempt
		if (event.target.value < this.state.ageMax) {
			this.setState({ageMin: event.target.value});
		}
	}

	//Function to handle setting maximum age for filtering
	maxAgeChange(event) {
		//check to be sure that they are setting max to a value
		//greater than the min, if not just ignore their attempt
		if (event.target.value > this.state.ageMin) {
			this.setState({ageMax: event.target.value});
		}
	}

	//Function to handle setting the question
	questionChange(event) {
		this.setState({
			question: event
		});
	}

	//Function to get data in proper format for pie chart
	getPieData(responseCount) {
	  	var totalResponses = 0;
	  	//Basically get the total number of responses in the sample, since
	  	//because we are doing pie chart we need fractions of the whole,
	  	//aka totalResponses
	  	for (var key in responseCount) {
	  		totalResponses += responseCount[key];
	  	}
	  	//set response labels and their respective counts for question 1
	  	if (this.state.question === "q1") {
	  		return [
	  			{ label: "Excellent", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Good", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Only Fair", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Poor", value: ((responseCount["4"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "No Response", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) }
			];
	  	} else if (this.state.question === "q2") {
	  		//set response labels and their respective counts for question 2
	  		return [
	  			{ label: "Very Happy", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Pretty Happy", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Not Too Happy", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Poor", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qa1") {
	  		//set response labels and their respective counts for question 3
	  		return [
	  			{ label: "Satisfied", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Dissatisfied", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "No Answer", value: ((responseCount["8"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qb2_2") {
	  		//set response labels and their respective counts for question 4
	  		return [
	  			{ label: "Strengthen", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Burden", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Neither/Both Equally", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qb2_3") {
	  		//set response labels and their respective counts for question 5
	  		return [
	  			{ label: "Agree", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Disagree", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Neither/Both Equally", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qb2_4") {
	  		//set response labels and their respective counts for question 6
	  		return [
	  			{ label: "Agree", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Disagree", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Neither/Both Equally", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qb2_5") {
	  		//set response labels and their respective counts for question 7
	  		return [
	  			{ label: "Agree", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Disagree", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Neither/Both Equally", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qb3") {
	  		//set response labels and their respective counts for question 8
	  		return [
	  			{ label: "Smaller", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Bigger", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Depends", value: ((responseCount["3"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qc2") {
	  		//set response labels and their respective counts for question 9
	  		return [
	  			{ label: "Right", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "Wrong", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	} else if (this.state.question === "qd1") {
	  		//set response labels and their respective counts for question 10
	  		return [
	  			{ label: "More", value: ((responseCount["1"]/totalResponses) * 100).toFixed(2) },
	  			{ label: "No Change", value: ((responseCount["8"]/totalResponses) * 100).toFixed(2) },
				{ label: "Less", value: ((responseCount["2"]/totalResponses) * 100).toFixed(2) },
				{ label: "No Answer", value: ((responseCount["9"]/totalResponses) * 100).toFixed(2) },
			];
	  	}
	}

	//Function to get data in proper format for bar chart
	getBarData(responseCount) {
		//set response labels and their respective counts for question 1
		if (this.state.question === "q1") {
			return [{
				"values": [
					{ "x": "Excellent", "y":  responseCount["1"]},
					{ "x": "Good", "y": responseCount["2"]},
					{ "x": "Only Fair", "y": responseCount["3"]},
					{ "x": "Poor", "y": responseCount["4"]},
					{ "x": "No Reponse", "y": responseCount["9"]},
				]
			}];
		} else if (this.state.question === "q2") {
			//set response labels and their respective counts for question 2
			return [{
				"values": [
					{ "x": "Very Happy", "y":  responseCount["1"]},
					{ "x": "Pretty Happy", "y": responseCount["2"]},
					{ "x": "Not Too Happy", "y": responseCount["3"]},
					{ "x": "No Answer", "y": responseCount["9"]},
				]
			}];
		} else if (this.state.question === "qa1") {
			//set response labels and their respective counts for question 3
			return [{
			    "values": [
					{ "x": "Satisfied", "y":  responseCount["1"]},
					{ "x": "Dissatisfied", "y": responseCount["2"]},
					{ "x": "No Answer", "y": responseCount["8"]},
			    ]
			}];
		} else if (this.state.question === "qb2_2") {
			//set response labels and their respective counts for question 4
			return [{
			    "values": [
					{ "x": "Strengthen", "y":  responseCount["1"]},
					{ "x": "Burden", "y": responseCount["2"]},
					{ "x": "Neither/Both Equally", "y": responseCount["3"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		} else if (this.state.question === "qb2_3") {
			//set response labels and their respective counts for question 5
			return [{
			    "values": [
					{ "x": "Agree", "y":  responseCount["1"]},
					{ "x": "Disagree", "y": responseCount["2"]},
					{ "x": "Neither/Both Equally", "y": responseCount["3"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		} else if (this.state.question === "qb2_4") {
			//set response labels and their respective counts for question 6
			return [{
			    "values": [
					{ "x": "Agree", "y":  responseCount["1"]},
					{ "x": "Disagree", "y": responseCount["2"]},
					{ "x": "Neither/Both Equally", "y": responseCount["3"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		} else if (this.state.question === "qb2_5") {
			//set response labels and their respective counts for question 7
			return [{
			    "values": [
					{ "x": "Agree", "y":  responseCount["1"]},
					{ "x": "Disagree", "y": responseCount["2"]},
					{ "x": "Neither/Both Equally", "y": responseCount["3"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		} else if (this.state.question === "qb3") {
			//set response labels and their respective counts for question 8
			return [{
			    "values": [
					{ "x": "Smaller", "y":  responseCount["1"]},
					{ "x": "Bigger", "y": responseCount["2"]},
					{ "x": "Depends", "y": responseCount["3"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		} else if (this.state.question === "qc2") {
			//set response labels and their respective counts for question 9
			return [{
			    "values": [
					{ "x": "Right", "y":  responseCount["1"]},
					{ "x": "Wrong", "y": responseCount["2"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		} else if (this.state.question === "qd1") {
			//set response labels and their respective counts for question 10
			return [{
			    "values": [
					{ "x": "More", "y":  responseCount["1"]},
					{ "x": "No Change", "y": responseCount["8"]},
					{ "x": "Less", "y": responseCount["2"]},
					{ "x": "No Answer", "y": responseCount["9"]}
			    ]
			}];
		}
	}

	//Render function for component
	render() {
		//Make object for all of the responses, and their counts
	  	var responseCount = {};
	  	//save this because can't use inside filter function
	  	var that = this;
	  	//filter data based on given. I won't go over specific conditions
	  	//but essentially the age range is grouped to be between
	  	//min and max, gender, race, and political party are 
	  	//grouped so if it's set to a truthy value in state 
	  	//it will be included in the cured dataset
	  	var filterData = barJson.filter(function(responder) {
	  		return (+responder["age"] >= that.state.ageMin 
	  			&& +responder["age"] <= that.state.ageMax)
	  			&& (+responder["sex"] === that.state.male
	  				|| +responder["sex"] === that.state.female)
	  			&& (+responder["race"] === that.state.white
	  				|| +responder["race"] === that.state.black
	  				|| +responder["race"] === that.state.asian
	  				|| +responder["race"] === that.state.otherRace)
	  			&& (+responder["party"] === that.state.republican
	  				|| +responder["party"] === that.state.democrat
	  				|| +responder["party"] === that.state.independent
	  				|| +responder["party"] === that.state.noPrefereceParty
	  				|| +responder["party"] === that.state.otherParty
	  				|| +responder["party"] === that.state.noAnswerParty);
	  	});
	  	//keep track of distinct labels for responses
	  	//var unique = {};
		var distinct = [];
		//for each "row" in cured dataset, make an empty set with
		//the unique responses
		//credit someone on stackoverflow for the idea, the link is escaping me...
		for(var i in filterData){
			//if the response of the question is not seen, add it to seen,
			//and initialize the count to 0
			if( typeof(responseCount[filterData[i][this.state.question]]) == "undefined"){
				distinct.push(filterData[i][this.state.question]);
			}
			responseCount[filterData[i][this.state.question]] = 0;
		}
		//for each "row" in cured dataset, sum together all
		//reponses for each different reponse
	  	for (var i in filterData) {
	  		responseCount[filterData[i][this.state.question]]++;
		}
		//Get the data in the proper format
		var barData = this.getBarData(responseCount);
		var pieData = this.getPieData(responseCount);
		
		//Get window width
		var windowWidth = this.state.windowWidth;
		//Set initial graph width
		var graphWidth = 0;
		//Padding constants for Bootstrap are 15px on each side
		//plus a little extra love
		var paddingConstant = 48;
		//Set the graph width depending on screen size
		if (windowWidth >= 1200) {
			//large
			graphWidth = windowWidth * (10/12) - paddingConstant * 4;
		} else if (windowWidth >= 992) {
			//medium
			graphWidth = windowWidth * (10/12) - paddingConstant * 3;
		} else if (windowWidth >= 768) {
			//"medium small"
			graphWidth = windowWidth * (9/12) - paddingConstant * 2;
		} else if (windowWidth >= 480) {
			//small
			graphWidth = windowWidth * (8/12) - paddingConstant;
		} else {
			//extra small
			graphWidth = windowWidth - paddingConstant;
		}

		//Array for components to be rendered in question menu
		var questionItems = [];
		//For each of the questions selected
		for (var key in questionTextObj) {
			//if it's question 1, 4, or 9 we are looking at, add
			//a header, because those are different sections
			if (key === "q1") {
				questionItems.push(<MenuItem header>Personal</MenuItem>)
			} else if (key === "qb2_2") {
				questionItems.push(<MenuItem header>Domestic</MenuItem>)
			} else if (key === "qc2") {
				questionItems.push(<MenuItem header>Foreign Affairs</MenuItem>)
			}
			//create and add the question menu item
			var questionItem = <MenuItem eventKey={key}>{questionTextObj[key]}</MenuItem>
			questionItems.push(questionItem)
			//If it is questions 3 or 8, add a divider because those
			//are the ends of the sections
			if (key === "qa1" || key === "qb3") {
				var separator = <MenuItem divider />
				questionItems.push(separator);
			}
		}
	    return (
	    	<div id="datapage">
	    		<h2>Data from Muslim Communities</h2>
	    		<p className="centerText">
	    			This section contains data collected by Pew Research on 
	    			Muslims in America in 2007. They conducted phone interviews 
	    			on 1050 subject ranging in age 18 to 88. For more information or 
	    			a link to the data, go&nbsp;
	    			<a href="http://www.pewsocialtrends.org/category/datasets/page/3/?download=5720">
	    			here</a>
	    		</p> 
	    		<div id="questionArea">
	    			<h3>{questionTextObj[this.state.question]}</h3>
		    	</div>
	    		<div className="container">
	    			<div className="row">
	    				<div className="col-xs-12 col-ms-4 col-sm-3 col-md-2 col-lg-2">
			    			<DropdownButton bsStyle='default' title="Choose Question" id="questionDropdown" onSelect={this.questionChange}>
								{questionItems}
							</DropdownButton>
			    			<h4>Filter Responders</h4>
			    			<form role="form">
				    			<FormGroup>
				    				<h5>Age</h5>
					    			<label htmlFor="ageMin" id="ageMinLabel">Age Min: </label>
					    			<output htmlFor="ageMin" id="ageMinOutput">{this.state.ageMin}</output>
					    			<input type="range" id="ageMin" min="18" max="88" step="1" onChange={this.minAgeChange} defaultValue={this.state.ageMin} aria-label="Min Age" />
					    			<label htmlFor="ageMax" id="ageMaxLabel">Age Max: </label>
					    			<output htmlFor="ageMax" id="ageMaxOutput">{this.state.ageMax}</output>
					    			<input type="range" id="ageMax" min="18" max="88" onChange={this.maxAgeChange} defaultValue={this.state.ageMax} aria-label="Max Age" />
				    			</FormGroup>
				    			<FormGroup>
				    				<h5>Gender</h5>
				    				<Checkbox onChange={this.maleChange} defaultChecked={this.state.male} inline>Males</Checkbox>
				    				<Checkbox onChange={this.femaleChange} defaultChecked={this.state.female} inline>Females</Checkbox>
				    			</FormGroup>
				    			<FormGroup>
				    				<h5>Race</h5>
				    				<Checkbox onChange={this.whiteChange} defaultChecked={this.state.white} inline>White</Checkbox>
				    				<Checkbox onChange={this.blackChange} defaultChecked={this.state.black} inline>Black</Checkbox>
				    				<Checkbox onChange={this.asianChange} defaultChecked={this.state.asian} inline>Asian</Checkbox>
				    				<Checkbox onChange={this.otherRaceChange} defaultChecked={this.state.otherRace} inline>Other/Mixed</Checkbox>
				    			</FormGroup>
				    			<FormGroup>
				    				<h5>Political Affiliation</h5>
				    				<Checkbox onChange={this.republicanChange} defaultChecked={this.state.republican} inline>Republican</Checkbox>
				    				<Checkbox onChange={this.democratChange} defaultChecked={this.state.democrat} inline>Democrat</Checkbox>
				    				<Checkbox onChange={this.independentChange} defaultChecked={this.state.independent} inline>Independent</Checkbox>
				    				<Checkbox onChange={this.noPreferencePartyChange} defaultChecked={this.state.noPrefereceParty} inline>No Party Preference</Checkbox>
				    				<Checkbox onChange={this.otherPartyChange} defaultChecked={this.state.otherParty} inline>Other Party</Checkbox>
				    				<Checkbox onChange={this.noAnswerPartyChange} defaultChecked={this.state.noAnswerParty} inline>No Answer</Checkbox>
				    			</FormGroup>
			    			</form>
			    			<p>Total Responses: {filterData.length}</p>
		    			</div>
		    			<div className="col-xs-12 col-ms-8 col-sm-9 col-md-10 col-lg-10" aria-live="polite">
				    		<BarChart
								data={barData}
								width={graphWidth}
								height={200}
								title=""
								xAxisLabel=""
								yAxisLabel="Responses"
							/>
							<PieChart
								data={pieData}
								width={graphWidth}
								height={300} 
								radius={80}
								innerRadius={20}
								sectorBorderColor="white"
								title=""
				      		/>
				      	</div>
				    </div>
		      	</div>
	    	</div>
	    );
	}
}

export default DataPage;