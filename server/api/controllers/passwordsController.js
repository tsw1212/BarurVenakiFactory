const express = require("express");
const usersServices = require("../../services/usersServices");
const passwordsServices = require("../../services/passwordsServices");
const validation = require('../../modules/validation');

const passwordsController = {
    updatePassword: async (req, res) => {
        try {
            let updatedPasswordData = req.body;
            if (!validation.validatePasswordInput(updatedPasswordData, true)) {
                res.status(400).json({ error: 'invalid input' });
            } else if (await usersServices.getUserByEmail(updatedPasswordData.email) === null) {
                res.status(404).json({ error: "user not found" });
            } else {
                await passwordsServices.updatePassword(updatedPasswordData);
                res.status(200).json('password was updated successfully');
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
}

module.exports = passwordsController;