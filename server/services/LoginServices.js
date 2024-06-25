const crypto = require('crypto');
require('dotenv').config();
const DB_actionsUser = require('../DB_access/usersDB_handler');
const DB_actionsManager = require('../DB_access/managerDB_handler');
const tokenActions = require('../modules/token');
const DB_actionsPasswords = require('../DB_access/passwordsDB_handler');
const bcrypt = require('bcrypt');
const sendEmail = require('../modules/email');

const authenticateUser = async (body) => {
    let passwordData = await DB_actionsPasswords.getPasswordByEmail(body.email);
    if (passwordData && await bcrypt.compare(body.password, passwordData.password)) {
        const user = await DB_actionsUser.getUserByEmail(passwordData.email);
        const isManager=await DB_actionsManager.getManagerById(user.id)
        if (isManager!==undefined) 
            return tokenActions.createToken("manager",user.id);
        else
            return tokenActions.createToken("user",user.id);
    }
    else {
        return false;
    }
}
const forgotPassword = async (email) => {
    const newPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    DB_actionsPasswords.updatePassword({ email: email, password: hashedPassword });
         const factoryData =await factoryServices.getFactorieByName(process.env.FACTORY_NAME)

    sendEmail(`הסיסמא החדשה שלך -${process.env.FACTORY_NAME}`,`Your new password is: ${newPassword}`,email); 
}

module.exports = {
    authenticateUser,
    forgotPassword

};

