const crypto = require('crypto');
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken');
const { createTokenPair } = require('../auth/auth.utils');
const shopModel = require('../models/shop.model');
const { getInfoData } = require('../utils');  // Correct import
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AccessService {
    static signUp = async ({ name: username, email, password }) => {
        try {
            // Check if the email already exists in the database
            const existingShop = await shopModel.findOne({ email }).lean();
            if (existingShop) {
                return {
                    code: '20001',
                    message: 'Email already exists',
                    status: 'error'
                };
            }

            // Hash the password before storing it
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new shop in the database
            const newShop = await shopModel.create({
                name: username,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });

            if (newShop) {
                // Generate the RSA key pair
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
                });

                // Create the public key token for the shop
                const publickeyString = await KeyTokenService.createKeyToken({
                    userID: newShop._id,
                    publicKey
                });

                if (!publickeyString) {
                    console.error('Error generating public key string'); // Debugging log
                    return {
                        code: '20002',
                        message: 'Error when creating public key',
                        status: 'error'
                    };
                }


                // Create the JWT tokens (public and private keys are passed to create the pair)
                const publicKeyObject = crypto.createPublicKey(publickeyString);
                const tokens = await createTokenPair({
                    userID: newShop._id,
                    email: newShop.email
                }, publickeyString, privateKey);

                console.log('Created tokens successfully:', tokens);

                const shopInfo = getInfoData({ fields: ['_id', 'name', 'email'], object: newShop });

                return {
                    code: 201,
                    metadata: {
                        shop: shopInfo,
                        tokens
                    }
                };
            }

            return {
                code: '20003',
                message: 'Failed to create shop',
                status: 'error'
            };

        } catch (error) {
            return {
                code: '20002',
                message: error.message,
                status: 'error'
            };
        }
    }
}

module.exports = AccessService;
