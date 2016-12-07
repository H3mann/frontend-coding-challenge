import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Thumbnail } from 'react-bootstrap';
// import moment from 'moment';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      var { addedEvents } = this.props;
      return (
        <div>
            <h2>Upcoming Events</h2>
            <div>
            {addedEvents.map((event) => {
              return(
                <Thumbnail>
                    <h3>Event Title: {event.title}</h3>
                    <p>Event Start Time and Date: {event.title}</p>
                    <p>Event End Time and Date: {event.title}</p>
                </Thumbnail>
              )
            })}
            </div>
        </div>
      );
    }
}

export default EventList;
