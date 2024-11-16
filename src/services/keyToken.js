'use strict'

const keyTokenModel = require('../models/keyToken.model')
// không lấy token trong access service
class KeyToken {
    static createKeyToken = async ({userId, publicKey}) => {
        try {
            const publicKeyString = publicKey.toString()
            const keyToken = await keyTokenModel.create({
                user: userId,
                publicKey
            });
            // return tokens ? tokens.publicKeyString : null;
            return publicKeyString
        } catch (error) {
            return null;
        }
    }
}

module.exports = KeyToken