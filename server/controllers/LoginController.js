const crypto = require('crypto');
const DB_actionsUser = require('../DB_access/usersDB_handler');
const DB_actionsManager = require('../DB_access/managerDB_handler');
const tokenActions = require('../modules/token');
const bcrypt = require('bcrypt');


const authenticateUser = async (body) => {
    let user = await DB_actionsUser.getUserByEmail(body.email);
    if (user && await bcrypt.compare(body.password, user.password)) {
        if (DB_actionsManager.getManagerById(user.id) !== undefined)
            return tokenActions.createToken("manager");
        else
            return tokenActions.createToken("user");
    }
    else {
        return false;
    }
}

module.exports = {
    authenticateUser,

};

