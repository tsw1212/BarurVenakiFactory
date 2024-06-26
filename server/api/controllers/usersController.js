const express = require("express");
const UsersServices = require("../../services/usersServices");
const validation = require('../../modules/validation');

const usersController = {
    getAllUsers: async (req, res) => {
        // if (req.securityLevel != "manager")
        //     res.status(401).json({ error: "unauthorized" });
        // else {
            try {
                let users = await UsersServices.getAllUsers();
                res.status(200).json(users);
                res.end();
            } catch (error) {
                res.status(500).json({ error: "server internal error" });
                res.end();
            }
        // }
    },
    getUserById: async (req, res) => {
        // if (req.securityLevel != "user" && req.securityLevel != 'manager')
        //     res.status(401).json({ error: "unauthorized" });
        // else{
        try {
            const { id } = req.params;
            if(id!=req.userId){
                return res.status(401).json({ error: "unauthorized" });
            }
            let user = await UsersServices.getUserById(id);
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
    // }
    },
    getUsersOrders: async (req, res) => {
        // if (req.securityLevel != "user" && req.securityLevel != 'manager')
        //     res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            if(id!=req.userId){
                return res.status(401).json({ error: "unauthorized" });
            }
            if (await UsersServices.getUserById(id) == null) {
                res.status(404).json({ error: "user not found" });
                res.end();
                return;
            }
            let orders = await UsersServices.getUserOrdersDetails(id);
            res.status(200).json(orders);
            res.end();
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
            res.end();
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            if (!validation.validateUserInput(user)) {
                res.status(400).json({ error: 'invalid input' });
                res.end();
            }
            else if (await UsersServices.getUserByEmail(user.email)) {
                res.status(400).json({ error: 'email already exists' });
                res.end();
            }
            else {
                const newUser = await UsersServices.createUser(user);
                res.status(200).json(newUser);
                res.end();
            }

        } catch (error) {
            res.status(500).json({ error: "server internal error" });
            res.end();
        }
    },
    updateUser: async (req, res) => {
        // if (req.securityLevel != "user" && req.securityLevel != 'manager')
        //   return  res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            if(id!=req.userId){
                return res.status(401).json({ error: "unauthorized" });
            }
            let updatedUserData = req.body;
            if (!validation.validateUserInput(updatedUserData, true)) {
                res.status(400).json({ error: 'invalid input' });
                res.end();
            }
            else if (await UsersServices.getUserById(id) == null) {
                res.status(404).json({ error: "user not found" });
                res.end();
            }
            else {
                updatedUserData = await UsersServices.updateUser(updatedUserData);
                res.status(200).json(updatedUserData);
                res.end();
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
            res.end();
        }
    },
    deleteUser: async (req, res) => {
        if ( req.securityLevel != 'manager')
            return res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            if (await UsersServices.getUserById(id) == null) {
                res.status(404).json({ error: "user not found" });
                res.end();
            }
            else {
                await UsersServices.deleteUser(id);
                res.status(200).json({});
                res.end();
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
            res.end();
        }
    }

}

module.exports = usersController;