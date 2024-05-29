import * as React from 'react';
import '../../css/event.css';

function Event({ event }) {
  return (
    <div className="event">
      <p>ID: {event.eventId}</p>
      <p>{event.text}</p>
      <p>תאריך: {event.date}</p>
    </div>
  );
}

export default Event;
