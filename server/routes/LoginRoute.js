const express = require("express");
const router = express.Router();
const tokenActions = require("../modules/token");
const validation = require("../modules/validation");
const UsersController = require("../controllers/usersController");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
  try {
    if (!validation.validateLoginInput(req.body)) {
      res.status(400).json({ error: "invalid input" });
      res.end();
    }
    const token = await tokenActions.authenticateUser(req.body);    
    if(token == false) {
        res.status(404).json({'error': 'invalid user email or password'})
        res.end();
    }
    else {
        const user = await UsersController.getUserByEmail(req.body.email);
        res.setHeader('XAuthentication-Token', token);
        res.setHeader("Access-Control-Expose-Headers", "*");
        res.status(200).json(user);
        res.end();
    }

} catch (err) {
    res.status(500).json({'error': "failed to login"});
    res.end();
  }
});
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await UsersController.getUserByEmail(email);
  if (!user) {
      return res.status(404).send('User not found');
  }
  const newPassword = crypto.randomBytes(8).toString('hex');
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword; 
  UsersController.updateUser(user);

  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'tzivish2141@gmail.com',
          pass: 't0527607564',
      },
  });

  const mailOptions = {
      from: 'tzivish2141@gmail.com',
      to: email,
      subject: 'הסיסמא החדשה שלך -ברור ונקי',
      text: `Your new password is: ${newPassword}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).send(error.toString());
      }
      res.send('New password has been sent to your email');
  });
});


module.exports = router;
