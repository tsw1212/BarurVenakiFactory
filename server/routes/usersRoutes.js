const express = require("express");
const app = express.Router();
const UsersController = require("../controllers/usersController");
const validation = require('../modules/validation');


app.get('/', async (req, res) => {
    if (req.securityLevel !== "manager")
        res.status(401).json({ error: "unauthorized" });
    else {
        try {
            let users = await UsersController.getAllUsers();
            res.status(200).json(users);
            res.end();
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
            res.end();
        }
    }
});

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let user = await UsersController.getUserById(id);
        if (!user) {
            res.status(404).json({ error: "user not found" });
            res.end();
        }
        else {
            res.status(200).json(user);
            res.end();
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
        res.end();
    }
});

app.get('/:id/orders', async (req, res) => {
    try {
        const { id } = req.params;
        if (await UsersController.getUserById(id) == null) {
            res.status(404).json({ error: "user not found" });
            res.end();
        }
        let orders = await UsersController.getUserOrdersDetails(id);
        res.status(200).json(orders);
        res.end();
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
        res.end();
    }
});

app.post('/', async (req, res) => {
    try {
        const user = req.body;
        if (!validation.validateUserInput(user)) {
            res.status(400).json({ error: 'invalid input' });
            res.end();
        }
        else if (await UsersController.getUserByEmail(user.email)) {
            res.status(400).json({ error: 'email already exists' });
            res.end();
        }
        else {
            const newUser = await UsersController.createUser(user);
            res.status(200).json(newUser);
            res.end();
        }

    } catch (error) {
        res.status(500).json({ error: "server internal error" });
        res.end();
    }
});

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let updatedUserData = req.body;
        if (!validation.validateUserInput(updatedUserData, true)) {
            res.status(400).json({ error: 'invalid input' });
            res.end();
        }
        else if (await UsersController.getUserById(id) == null) {
            res.status(404).json({ error: "user not found" });
            res.end();
        }
        else {
            updatedUserData = await UsersController.updateUser(updatedUserData);
            res.status(200).json(updatedUserData);
            res.end();
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
        res.end();
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (await UsersController.getUserById(id) == null) {
            res.status(404).json({ error: "user not found" });
            res.end();
        }
        else {
            await UsersController.deleteUser(id);
            res.status(200).json({});
            res.end();
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
        res.end();
    }
});


module.exports = app;

