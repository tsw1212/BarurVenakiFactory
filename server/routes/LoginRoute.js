const express = require("express");
const router = express.Router();
const tokenActions = require("../modules/token");
const validation = require("../modules/validation");
const UsersController = require("../controllers/usersController");
const loginController = require('../controllers/LoginController');


router.post("/", async (req, res) => {
  try {
    if (!validation.validateLoginInput(req.body)) {
      res.status(400).json({ error: "invalid input" });
      res.end();
    }
    const token = await loginController.authenticateUser(req.body);    
    if(token == false) {
        res.status(404).json({'error': 'invalid user email or password'})
        res.end();
    }
    else {
        const user = await UsersController.getUserByEmail(req.body.email);
        res.setHeader('XAuthentication-Token', token);
        res.setHeader('XSecurity-Level', tokenActions.statusToken(token));
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
  try{
    loginController.forgotPassword(email);
    res.send('New password has been sent to your email');

  }
  catch(err) {
     res.status(500).send(err.toString());

  }
});


module.exports = router;
