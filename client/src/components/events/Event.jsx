import * as React from 'react';
import '../../css/event.css';
import formatDates from '../../modules/formatDateTime'

function Event({ event }) {
  return (
    <div className="event">
      <p>{event.text}</p>
      <p>תאריך: {formatDates.formatDateTime(event.date)}</p>
    </div>
  );
}

export default Event;
