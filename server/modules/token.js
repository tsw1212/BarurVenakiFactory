const crypto = require('crypto');

const usersTokens = [];
const managersTokens=[];
const guest_token='jbhu478gdb9fvbvu96g';
const createToken = (status) => {
    const randomString = crypto.randomBytes(32).toString('hex');
    const timestamp = Math.floor(Date.now() / 1000);
    const tokenData = `${randomString}.${timestamp}`;
    const token = crypto.createHash('sha256').update(tokenData).digest('hex');
    if(status=="user")
        {
            usersTokens.push(token)  
        }
        else if(status=="manager")
            {
                managersTokens.push(token)
            }

        return token;
}

 const validateToken =  (recievedToken) => {
      return managersTokens.find(t => t == recievedToken)||usersTokens.find(t=>t==recievedToken)||recievedToken==guest_token ? true : false;
}
const statusToken= (recievedToken)=>{
    if( managersTokens.find(t => t == recievedToken))
        return "manager";
    else if(usersTokens.find(t=>t==recievedToken))
        return "user";
    else if(recievedToken==guest_token){
        return "guest";
    }
    
}
module.exports = {
    createToken,
    validateToken,
    statusToken,
    guest_token
};