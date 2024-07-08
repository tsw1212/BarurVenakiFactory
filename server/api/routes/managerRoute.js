const express = require("express");
const app = express.Router();
const managersControllers = require('../controllers/managersController');

app.post('/', managersControllers.createManager);

module.exports = app;
