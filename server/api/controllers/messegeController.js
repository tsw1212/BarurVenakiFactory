const  validation  = require('../../modules/validation');
const sendEmail = require('../../modules/email');

const MessegeController = {
    sendMessege: async (req, res) => {
        const { title, body, email } = req.body;
        const { isValid, errors } = validation.validateMessageInput({ title, body });
        if (!isValid) {
            return res.status(400).json({ errors });
        }

        try {
            await sendEmail(title, body, email);
            res.status(200).json({ message: 'Message sent successfully.' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send message. Please try again later.' });
        }
    }
};

module.exports = MessegeController;
