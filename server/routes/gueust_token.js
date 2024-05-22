const express = require("express");
const app = express.Router();
const tokenActions = require("../modules/token");

app.get('/', async (req, res) => {
    const guest_token = tokenActions.guest_token;
    res.status(200).json({ guest_token });
});
module.exports =app;
