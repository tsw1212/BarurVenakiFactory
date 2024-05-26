const crypto = require('crypto');
const DB_actionsUser = require('../DB_access/usersDB_handler');
const DB_actionsManager = require('../DB_access/managerDB_handler');
const tokenActions = require('../modules/token');
const DB_actionsPasswords = require('../DB_access/passwordsDB_handler');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const authenticateUser = async (body) => {
    let passwordData = await DB_actionsPasswords.getPasswordByEmail(body.email);
    if (passwordData && await bcrypt.compare(body.password, passwordData.password)) {
        const user = await DB_actionsUser.getUserByEmail(passwordData.email);
        const isManager=await DB_actionsManager.getManagerById(user.id)
        if (isManager!==undefined) 
            return tokenActions.createToken("manager");
        else
            return tokenActions.createToken("user");
    }
    else {
        return false;
    }
}
const forgotPassword = async (email) => {
    const newPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    DB_actionsPasswords.updatePassword({ email: email, password: hashedPassword });
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tzivish2141@gmail.com',
            pass: 'aive hpbo jmgv myhy',
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
            throw error;
        }
    }
    )
}

module.exports = {
    authenticateUser,
    forgotPassword

};

