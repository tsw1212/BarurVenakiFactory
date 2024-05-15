const express = require("express");
const router = express.Router();
const tokenActions = require("../modules/token");
const validation = require("../modules/validation");
const UsersController = require("../controllers/usersController");

router.post("/", async (req, res) => {
  try {
    let user=req.body;
    if (!validation.validateUserInput(user)) {
      res.status(400).json({ error: "invalid input" });
      res.end();
    }
    if(UsersController.getUserByEmail(user.email) !== undefined) {
        res.status(400).json({ error: "email already exists" });
        res.end();
    }
    const token = await tokenActions.createToken("user");   
        const newUser = await UsersController.createUser(user);
        res.setHeader('Authentication-Token', token);
        res.setHeader("Access-Control-Expose-Headers", "*");
        res.status(200).json(newUser);
        res.end();
    

} catch (err) {
    res.status(500).json({'error': "failed to login"});
    res.end();
  }
});


module.exports = router;
