const express = require("express");
const tokenActions = require("../../modules/token");
const validation = require('../../modules/validation');
const UsersServices = require("../../services/usersServices");
const LoginServices = require('../../services/LoginServices');

const LogInController = {
    logIn: async (req, res) => {
        try {
            if (!validation.validateLoginInput(req.body)) {
                res.status(400).json({ error: "invalid input" });
                res.end();
            }
            const token = await LoginServices.authenticateUser(req.body);
            if (token == false) {
                res.status(404).json({ 'error': 'invalid user email or password' })
                res.end();
            }
            else {
                const user = await UsersServices.getUserByEmail(req.body.email);
                res.setHeader('XAuthentication-Token', token);
                res.setHeader('XSecurity-Level', tokenActions.statusToken(token));
                res.setHeader("Access-Control-Expose-Headers", "*");
                res.status(200).json(user);
                res.end();
            }

        } catch (err) {
            res.status(500).json({ 'error': "failed to login" });
            res.end();
        }
    },
    forgotPassword: async (req, res) => {
        const { email } = req.body;
        const user = await UsersServices.getUserByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        try {
            LoginServices.forgotPassword(email);
            res.status(200).json('New password has been sent to your email');
        }
        catch (err) {
            res.status(500).send(err.toString());

        }
    }
}

module.exports = LogInController;