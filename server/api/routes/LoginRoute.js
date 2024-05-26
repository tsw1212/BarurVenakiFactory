const express = require("express");
const router = express.Router();
const LoginController=require('../controllers/loginController')


router.post("/", LoginController.logIn);
router.post('/forgot-password', LoginController.forgotPassword);


module.exports = router;
