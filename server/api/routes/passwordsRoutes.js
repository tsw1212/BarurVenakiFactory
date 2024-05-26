const express = require("express");
const app = express.Router();
const passwordsController = require('../controllers/passwordsController')


app.put('/:id', passwordsController.updatePassword);

module.exports = app;
