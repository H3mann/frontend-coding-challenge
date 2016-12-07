import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import moment from 'moment';

//CreateEvent renders a form for users to input a title, start and end dates and times which are validated by format and validity
class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            title: ''
        };
      this.onStartDateChange = this.onStartDateChange.bind(this);
      this.validateStartDate = this.validateStartDate.bind(this);
      this.onEndDateChange = this.onEndDateChange.bind(this);
      this.validateEndDate = this.validateEndDate.bind(this);
      this.onTitleChange = this.onTitleChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onTitleChange(e) {
      this.setState({title: e.currentTarget.value});
    }

    onStartDateChange(e) {
      this.setState({startDate: e.currentTarget.value});
    }
    //check if the start date is formatted correctly and not in the past
    validateStartDate() {
      const startDate = this.state.startDate;
      const yesterday = moment().subtract(1, 'days').format('MM-DD-YYYY hh:mm a');
      if (moment(startDate).isAfter(yesterday)) return 'success';
      else if(!this.state.startDate) return; //otherwise the form shows an error before the user inputs a date
      else return 'error';
    }

    onEndDateChange(e) {
      this.setState({endDate: e.currentTarget.value});
    }
    //check if the start date is formatted correctly and is the same or after the start date
    validateEndDate() {
      const startDate = this.state.startDate;
      const endDate = this.state.endDate;
      if (moment(endDate).isSameOrAfter(startDate)) return 'success';
      else if(!this.state.endDate) return; //otherwise the form shows an error before the user inputs a date
      else return 'error';
    }

    onFormSubmit(e) {
      e.preventDefault();
      //reformat the time and date
      const title = this.state.title
      const startTime = moment(this.state.startDate).format("hh:mm a");
      const endTime = moment(this.state.endDate).format("hh:mm a");
      const startDate = moment(this.state.startDate).format("MMM Do YYYY");
      const endDate = moment(this.state.endDate).format("MMM Do YYYY");

      if(!this.state.startDate || !this.state.endDate || !title) {
        alert('Please fill in all of the fields');
        return;
      }
      var event = {title, startDate, endDate, startTime, endTime}
      //addEvent allows the nex event to be passed down a props in the eventList component
      this.props.addEvent(event);
      this.setState({startDate:'', endDate:'', title:''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <h1>Create an Event</h1>

                    <FormGroup controlId='title'>
                        <ControlLabel>Enter an Event Title</ControlLabel>
                        <FormControl
                          type='text'
                          placeholder='New Years Party'
                          value={this.state.title}
                          onChange={this.onTitleChange}
                        />
                    </FormGroup>

                    <FormGroup
                      controlId='startDate'
                      validationState={this.validateStartDate()}
                    >
                        <ControlLabel>Enter a Start Date and time (MM-DD-YYYY hh:mm pm)</ControlLabel>
                        <FormControl
                          type='text'
                          placeholder='12-30-2017 12:00 pm'
                          value={this.state.startDate}
                          onChange={this.onStartDateChange}
                        />
                    </FormGroup>

                    <FormGroup
                      controlId='endDate'
                      validationState={this.validateEndDate()}
                    >
                        <ControlLabel>Enter an End Date and time(MM-DD-YYY hh:mm pm)</ControlLabel>
                        <FormControl
                          type='text'
                          placeholder='1-01-2018 12:00 pm'
                          value={this.state.endDate}
                          onChange={this.onEndDateChange}
                        />
                    </FormGroup>

                    <Button bsStyle="primary" type="submit" value="Submit">Enter</Button>
                </form>
            </div>
        );
    }
}

export default CreateEvent;
