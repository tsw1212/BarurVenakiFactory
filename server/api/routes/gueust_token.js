const express = require("express");
const app = express.Router();
const guestTokenController = require('../controllers/guest_token_controller');

app.get('/', guestTokenController.getGuestToken);

module.exports =app;
