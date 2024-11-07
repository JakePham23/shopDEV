const crypto = require('crypto');
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken.service');
const {createTokenPair} = require('../auth/auth.utils')
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService {
    static signUp = async ({name, email, password }) => {
        try {
            // Check username exists
            const hodelShop = await userModel.findOne({email}).lean();
            if (hodelShop) {
                return {
                    code: '20001',
                    message: 'Username already exists',
                    status: 'error'
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });

            if (newShop) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                    
                        type: 'pkcs1',
                        format: 'pem', 
                    }
                    // pubic key Cryptography standard #1
                });
                const publickeyString = await KeyTokenService.createKeyToken({
                    userID: newShop._id,
                    publicKey
                })
                if(!publickeyString){
                    return {
                        code: '20002',
                        message: 'Error when create public key',    
                    };
                }
                const publicKeyObject = crypto.createPublicKey(publickeyString)

                const tokens = await createTokenPair({userID: newShop._id, email}, publickeyString, privateKey);
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }
            }
          
            return{
                code: 200,
                metadata: null,
            }

        } catch (error) {
            return {
                code: '20002',
                message: error.message,
                status: 'error'
            };
        }
    }
}

module.exports = AccessService