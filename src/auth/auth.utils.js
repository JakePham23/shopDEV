'use strict '
const jwt = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
    try{
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days',
        })
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        })

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.log('Error verify token', err)
            } else{
                console.log('decode', decode)
            }
        })
        return {accessToken, refreshToken}
    } catch(error){
        return error
    }
}

module.exports = {
    createTokenPair
}