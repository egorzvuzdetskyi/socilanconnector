const secret = require('../config/keys').secretKey,
    jwt = require('jsonwebtoken'),
    expiresIn = 3600 * 24;


class JsonWebTokenClass {
    static async getToken(payload) {

        return await jwt.sign(
            payload,
            secret,
            {
                expiresIn
            })
    }
};

module.exports = JsonWebTokenClass;