const express = require("express");
const app = express.Router();
const LogOutController = require('../controllers/logOutController')


app.delete("/", LogOutController.logOut);



module.exports = app;
