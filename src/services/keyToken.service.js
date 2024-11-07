'use strict'

const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey}) => {
        try {
            const publickeyString = publickey.toString()
            const keyToken = await keyTokenModel.create({
                user: userId,
                publicKey
            });
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = KeyTokenService