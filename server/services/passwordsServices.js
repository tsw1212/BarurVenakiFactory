const DB_actions = require('../DB_access/passwordsDB_handler');
const bcrypt = require('bcrypt');


const PasswordsServices = {
    updatePassword: async (updatedPasswordData) => {
        const passwordData = await DB_actions.getPasswordByEmail(updatedPasswordData.email);
        if (bcrypt.compare(updatedPasswordData.password, passwordData.password)) {
            const hashedPassword = await bcrypt.hash(updatedPasswordData.newPassword, 10);
             await DB_actions.updatePassword({ email: updatedPasswordData.email, password: hashedPassword });
        }
        else {
            throw new Error('סיסמא שגויה');
        }
    }
};

module.exports = PasswordsServices;