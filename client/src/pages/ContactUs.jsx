import * as React from 'react';
import { Typography, TextField, Button, Container, Box } from '@mui/material';
import '../css/contactUs.css'; // Ensure correct path to your CSS file

export default function ContactUsPage() {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send message)
    console.log('Title:', title);
    console.log('Message:', message);
    // Clear the fields after submission
    setTitle('');
    setMessage('');
  };

  return (
    <Container className="pageContainer">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          צור קשר
        </Typography>
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="כותרת הודעה"
            variant="outlined"
            fullWidth
            required
            className="textField"
            value={title}
            onChange={handleTitleChange}
            sx={{ textAlign: 'right', backgroundColor: '#ffffff', marginBottom: '2vh' }} // Add margin here
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
            sx={{ textAlign: 'right', backgroundColor: '#ffffff', marginBottom: '2vh' }} // Add margin here
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
