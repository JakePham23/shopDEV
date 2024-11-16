'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME ='Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model

var keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Shop'
    },
        privateKey: {
            type: String,
            require: true,
        },
    publicKey: {
        type: String,
        require: true,
    },
    refreshToken: {
        type: Array, 
        default: [],
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
}
);

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);