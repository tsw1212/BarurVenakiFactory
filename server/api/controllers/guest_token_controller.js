const tokenActions = require("../../modules/token");
const express = require("express");

const GuestTokenController = {
    getGuestToken: async (req, res) => {
        const guest_token = tokenActions.guest_token;
        res.setHeader('XAuthentication-Token', guest_token);
        res.setHeader("Access-Control-Expose-Headers", "*");
        res.status(200).json('guest token created successfuly');
    }
}
module.exports = GuestTokenController;