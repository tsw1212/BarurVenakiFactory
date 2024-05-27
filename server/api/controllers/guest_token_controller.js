const tokenActions = require("../../modules/token");

const GuestTokenController = {
    getGuestToken: async (req, res) => {
        const guest_token = tokenActions.guest_token;
        res.setHeader("Access-Control-Expose-Headers", "*");
        res.setHeader('XAuthentication-Token', guest_token);
        res.status(200).json('guest token created successfully');
    }
};

module.exports = GuestTokenController;
