const crypto = require('crypto');
const DB_actions = require('../DB_access/usersDB_handler');

const tokens = [];

const authenticateUser = async (body) => {
    let user = await DB_actions.getUserByEmail(body.email);
    if (user.password == body.password) {
        return createToken();
    }
    else {
        return false;
    }
}

const createToken = () => {
    const randomString = crypto.randomBytes(32).toString('hex');
    const timestamp = Math.floor(Date.now() / 1000);
    const tokenData = `${randomString}.${timestamp}`;
    const token = crypto.createHash('sha256').update(tokenData).digest('hex');
    tokens.push(token);
    return token;
}

const validateToken = (recievedToken) => {
    return tokens.find(t => t == recievedToken) ? true : false;
}

module.exports = {
    authenticateUser,
    createToken,
    validateToken
};

