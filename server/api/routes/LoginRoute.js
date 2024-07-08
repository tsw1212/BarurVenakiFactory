const express = require("express");
const app = express.Router();
const LoginController = require('../controllers/loginController')


app.post("/", LoginController.logIn);
app.post('/forgot-password', LoginController.forgotPassword);



module.exports = app;
