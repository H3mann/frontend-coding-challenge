import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Thumbnail, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import 'whatwg-fetch';

class EventList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: [],
        titleSearch: '',
        dateSearch: '',
        filteredEvents: []
      };
      this.onDateSearch = this.onDateSearch.bind(this);
      this.onTitleSearch = this.onTitleSearch.bind(this);
    }

    componentDidMount() {
      fetch('https://api.eventable.com/v1/events/?format=json', {
        method: "GET",
        headers: {
          "Authorization": "Bearer re431uHoTgm3vAa8drIJkPpotjW2mn"
        }
      })
      .then((res) => {
          var decoder = new TextDecoder();
          var reader = res.body.getReader();
          //read and decode results from unit8array to JSON string, then JSON parse into an object
          return reader.read().then((result) => JSON.parse(decoder.decode(result.value, {stream: false})))
        })
       .then((data) => {
         //reformat the time and dates
         data.results.forEach((event)=>{
          event.start_time = moment(event.start_time, "YYYY-MM-DD H:mm").format("MMM Do YYYY h:mm a");
          event.end_time = moment(event.end_time, "YYYY-MM-DD H:mm").format("MMM Do YYYY h:mm a");
          return event;
         })
         this.setState({events: data.results});
       })
       .catch((err) => console.error(err));
    }

    onDateSearch(e) {
      const date = e.currentTarget.value;
      var events = [...this.state.events, ...this.props.addedEvents];
      var results = events.filter((event) => {
        return event.start_time.includes(date) || event.end_time.includes(date);
      })
      //when users entered text then deleted it, all of the events would appear so this if statement clears the form and filtered events
      if(!date) {
        this.setState({dateSearch: '', filteredEvents: []});
        return;
      }
      this.setState({dateSearch: date, filteredEvents: results});
    }

    onTitleSearch(e) {
      const title = e.currentTarget.value;
      var events = [...this.state.events, ...this.props.addedEvents];
      var results = events.filter((event) => event.title.toLowerCase().includes(title.toLowerCase()))
      //when users entered text then deleted it, all of the events would appear so this if statement clears the form and filtered events
      if(!title) {
        this.setState({titleSearch:'', filteredEvents: []});
        return;
      }
      this.setState({titleSearch: title, filteredEvents: results});
    }

    render() {
      var { addedEvents } = this.props;
      return (
        <div>
           <Row>
              <Col xs={12} md={6}>
                    <h2>Upcoming Events</h2>
                    <div>
                    {addedEvents.map((event) => {
                      return(
                        <Thumbnail>
                            <h3>Event Title: {event.title}</h3>
                            <p>Starts: {event.startDate} {event.startTime}</p>
                            <p>Ends: {event.endDate} {event.endTime}</p>
                        </Thumbnail>
                      )
                    })}
                    {this.state.events.map((event) => {
                      return(
                        <Thumbnail>
                            <h3>{event.title}</h3>
                            <p>Description: {event.description}</p>
                            <p>Starts: {event.start_time}</p>
                            <p>Ends: {event.end_time}</p>
                            {event.locations.map((location) => {
                              <p>Location: {location.name}</p>
                            })}
                            <p><a href={event.url}>Event Link</a></p>

                        </Thumbnail>
                      )
                    })}
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <FormGroup controlId='titleSearch'>
                        <ControlLabel>Search for Events by Title</ControlLabel>
                        <FormControl
                          type='text'
                          placeholder='New Years'
                          value={this.state.titleSearch}
                          onChange={this.onTitleSearch}
                        />
                    </FormGroup>
                    <FormGroup controlId='dateSearch'>
                        <ControlLabel>Search for Events by Date or Time (MMM-Do-YYYY hh:mm a)</ControlLabel>
                        <FormControl
                          type='text'
                          placeholder='Dec 29th 2016 11:59 pm'
                          value={this.state.dateSearch}
                          onChange={this.onDateSearch}
                        />
                    </FormGroup>
                    {this.state.filteredEvents.map((event) => {
                      return(
                        <Thumbnail>
                            <h3>Event Title: {event.title}</h3>
                            <p>Description: {event.decription || 'No description provided, it is a surprise!'}</p>
                            <p>Starts: {event.startDate} {event.start_time}</p>
                            <p>Ends: {event.endDate} {event.end_time}</p>
                        </Thumbnail>
                      )
                    })}
                </Col>
            </Row>
        </div>
      );
    }
}

export default EventList;
