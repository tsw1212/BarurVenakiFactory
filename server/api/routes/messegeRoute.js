const express = require("express");
const app = express.Router();
const messegeController = require('../controllers/messegeController');

app.post('/', messegeController.sendMessege);

module.exports = app;
