const crypto = require('crypto');

const usersTokens = [];
const managersTokens = [];
const guest_token = 'jbhu478gdb9fvbvu96g';

const createToken = (status, id) => {
    const randomString = crypto.randomBytes(32).toString('hex');
    const timestamp = Math.floor(Date.now() / 1000);
    const tokenData = `${randomString}.${timestamp}`;
    const token = crypto.createHash('sha256').update(tokenData).digest('hex');
    if (status == "user") {
        usersTokens.push(`${token}${id}`)
    }
    else if (status == "manager") {
        managersTokens.push(`${token}${id}`)
    }

    return token;
}

const validateToken = (recievedToken) => {
    return managersTokens.find(t => t == recievedToken) || usersTokens.find(t => t == recievedToken) || recievedToken == guest_token ? true : false;
}

const statusToken = (receivedToken) => {
    if (receivedToken === guest_token) {
        return { status: "guest", id: null };
    }

    const extractId = (token, receivedTokenLength) => {
        let id = '';
        let index = receivedTokenLength;
        while (index < token.length && !isNaN(token.charAt(index))) {
            id += token.charAt(index);
            index++;
        }
        return id;
    };

    const managerToken = managersTokens.find(t => t.startsWith(receivedToken));
    if (managerToken) {
        const id = extractId(managerToken, managerToken.length-1);
        return { status: "manager", id: id };
    }

    const userToken = usersTokens.find(t => t.startsWith(receivedToken));
    if (userToken) {
        const id = extractId(userToken,userToken.length-1 );
        return { status: "user", id: id };
    }

    return false;
}


const deleteToken = (token) => {

    const index1 = managersTokens.findIndex(t => t === token);
    if (index1 !== -1) {
        managersTokens.splice(index1, 1);
        return true;

    }
    const index2 = usersTokens.findIndex(t => t === token);
    if (index2 !== -1) {
        usersTokens.splice(index2, 1);
        return true;
    }

    return false;
}

module.exports = {
    createToken,
    validateToken,
    statusToken,
    guest_token,
    deleteToken
};