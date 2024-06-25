const express = require("express");
const tokenActions = require("../../modules/token");

const LogOutController = {
    logOut: async (req, res) => {
        try {
           const token = req.get('XAuthentication-Token');
            if (!token) {
                res.status(404).json({ 'error': 'invalid token' })
                res.end();
            }
            else {
                if(!tokenActions.deleteToken(token)){
                    res.status(404).json({ 'error': 'invalid token' })
                    res.end();
                }
                else{
                    res.status(200).json('token deleted successfully');
                    res.end();
                }
              
            }

        } catch (err) {
            res.status(500).json({ 'error': "failed to login" });
            res.end();
        }
    },
    
}

module.exports = LogOutController;