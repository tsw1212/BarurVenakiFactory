import * as React from 'react';
import { Typography, TextField, Button, Container, Box, Alert } from '@mui/material';
import '../css/contactUs.css'; 
import { postRequest } from '../modules/requests/server_requests';

export default function ContactUsPage() {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await postRequest('http://localhost:3000/sendMessege', { title, body: message, email }, token);
      if (response.ok) {
        setSuccessMessage('ההודעה נשלחה בהצלחה!');
        setErrorMessage('');
      } else {
        setErrorMessage('שליחת ההודעה נכשלה. אנא נסה שוב.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('שגיאה בשליחת ההודעה.');
      setSuccessMessage('');
      console.error('Error sending message:', error);
    }

    // Clear the fields after submission
    setTitle('');
    setMessage('');
    setEmail('');
  };

  return (
    <Container className="pageContainer">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          צור קשר
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="אימייל"
            variant="outlined"
            fullWidth
            required
            className="textField"
            value={email}
            onChange={handleEmailChange}
            sx={{ textAlign: 'right', backgroundColor: '#ffffff', marginBottom: '2vh', direction: 'rtl' }} // Add margin here
          />
          <TextField
            id="title"
            label="כותרת הודעה"
            variant="outlined"
            fullWidth
            required
            className="textField"
            value={title}
            onChange={handleTitleChange}
            sx={{ textAlign: 'right', backgroundColor: '#ffffff', marginBottom: '2vh', direction: 'rtl' }} // Add margin here
          />
          <TextField
            id="message-content"
            label="תוכן ההודעה"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            required
            className="textField"
            value={message}
            onChange={handleMessageChange}
            sx={{ textAlign: 'right', backgroundColor: '#ffffff', marginBottom: '2vh', direction: 'rtl' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submitButton"
            sx={{
              backgroundColor: ' #b1e773',
              '&:hover': {
                backgroundColor: '#9fe64e',
              },
            }}
          >
            שלח הודעה
          </Button>
        </form>
      </Box>
    </Container>
  );
}
