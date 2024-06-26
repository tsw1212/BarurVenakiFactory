const express = require("express");
const tokenActions = require("../../modules/token");
const validation = require('../../modules/validation');
const UsersServices = require("../../services/usersServices");
const sendEmail=require("../../modules/email");


const signupController={
    signup:async (req, res) => {
        try {
          let user = req.body;
          if (!validation.validateUserInput(user)) {
            res.status(400).json({ error: "invalid input" });
            res.end();
          }
          else if (await UsersServices.getUserByEmail(user.email) != undefined) {
            res.status(400).json({ error: "email already exists" });
            res.end();
          }
          else{
            const newUser = await UsersServices.createUser(user);
            const token = await tokenActions.createToken("user",newUser.id);
            sendEmail(`ברור ונקי- נרשמת בהצלחה`,'שמחים שהצטרפת למאגר הלקוחות של ברור ונקי',newUser.email)
            res.setHeader('XAuthentication-Token', token);
            res.setHeader('XSecurity-Level', 'user');
            res.setHeader("Access-Control-Expose-Headers", "*");
            res.status(200).json(newUser);
            res.end();
          }
        } catch (err) {
          res.status(500).json({ 'error': "failed to login" });
          res.end();
        }
      }

}

module.exports = signupController;