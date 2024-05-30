import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postRequest } from '../../modules/requests/server_requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/AddEvent.css'


function AddEvent({ orderId, token, onEventAdded, setAddEvent }) {
    const [eventText, setEventText] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleAddEvent = async () => {
        const newEvent = {
            orderId: orderId,
            text: eventText,
            date: eventDate,
        };

        const response = await postRequest(`http://localhost:3000/events`, newEvent, token);
        if (response.ok) {
            let { id, ...adjustedEvent } = response.body;
            adjustedEvent = { ...adjustedEvent, eventId: id };
            onEventAdded(adjustedEvent);
            setEventText('');
            setEventDate('');
            setAddEvent(false);
        } else {
            alert('אותרה בעיה בשמירת האירוע החדש בבקשה נסה שוב')
        }
    };

    return (
        <div className="addEventContainer">
            <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setAddEvent(false)} />
            <h3>הוסף אירוע חדש</h3>
            <TextField
                className='input'
                label="תיאור האירוע"
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                className='input'
                label="תאריך האירוע"
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br></br>
            <Button className='addEventB' variant="contained" color="primary" onClick={handleAddEvent}>
                הוסף אירוע
            </Button>
        </div>
    );
}

export default AddEvent;
