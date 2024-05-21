const express = require("express");
const app = express.Router();
const usersController = require("../controllers/usersController");
const passwordsController = require("../controllers/passwordsController");

const validation = require('../modules/validation');

app.put('/:id', async (req, res) => {
    
    try {
        let updatedPasswordData = req.body;
        if (!validation.validatePasswordInput(updatedPasswordData, true)) {
            res.status(400).json({ error: 'invalid input' });
        } else if (await usersController.getUserByEmail(updatedPasswordData.email) === null) {
            res.status(404).json({ error: "user not found" });
        } else {
            await passwordsController.updatePassword(updatedPasswordData);
            res.status(200).json('password was updated successfully');
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

module.exports = app;
