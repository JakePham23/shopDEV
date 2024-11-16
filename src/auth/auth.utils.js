'use strict'
const Jwt = require('jsonwebtoken')
const createTokenPair = async (payload,  publicKey, privateKey) =>{
    try{
        // access token
        const accessToken = await Jwt.sign(payload, privateKey , {
            algorithm: 'RS256',
            expiresIn: '2 days',
        })

        const refreshToken = await Jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        })


        // DEcode private key
        Jwt.verify(accessToken, publicKey, (err, decode)=>{
            if(err){
                console.log('error verify::', err);
            } else{
                console.log('decode verify::', decode)
            }
        })
        return {accessToken, refreshToken}
    }catch (error) {
        console.error('Error creating token pair:', error);
        throw new Error('Error creating token pair');
    }

}

module.exports = {
    createTokenPair,

}