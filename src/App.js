import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import CreateEvent from './components/eventForm';
import EventList from './components/eventsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
    this.addEvent = this.addEvent.bind(this);
  }
  addEvent(event) {
    var events = this.state.events;
    events.push(event);
    this.setState({events});
    console.log(this.state.events,"+++++events in App state++++++");
  }
  render() {
    const today = moment().format("dddd, MMMM Do YYYY");
    return (
      <Grid>
          <Row>
              <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Create and View Events</h2>
                </div>
                <p className="App-intro">
                  Today is: {today}
                </p>
              </div>
          </Row>
          <Row>
              <Col xs={12} md={6} mdOffset={3}>
                  <CreateEvent addEvent={this.addEvent}/>
              </Col>
          </Row>
              <Col xs={12}>
                  <EventList addedEvents={this.state.events}/>
              </Col>
      </Grid>
    );
  }
}

export default App;
