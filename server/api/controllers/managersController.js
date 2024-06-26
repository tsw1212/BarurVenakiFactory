const express = require("express");
const usersServices = require("../../services/usersServices");
const mangerServices = require("../../services/managersServices");


const managersController = {
    createManager: async (req, res) => {
        // if ( req.securityLevel != 'manager')
        //    return res.status(401).json({ error: "unauthorized" });
        try {
            const data = req.body;
            if(typeof data.id != 'string'){
                res.status(400).json({ error: 'invalid input' });
            }
            else if ( await usersServices.getUserById(data.id) === undefined) {
                res.status(404).json({ error: 'user not found' });
            } else {
                const newManager = await mangerServices.createManager(data);
                res.status(200).json({newManager});
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
}

module.exports = managersController;