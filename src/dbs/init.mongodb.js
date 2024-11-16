const mongoose = require('mongoose')
const {countConnect} = require ('../helpers/check.connect')
const {db : {host, name , port}} = require('../configs/mongodb.config')

const connectString=`mongodb://${host}:${port}/${name}`

class Database {
    constructor(){
        this.connect()
    }
    connect(type='mongodb'){
        if(1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color:true})
        }
        mongoose.connect(connectString) .then( _ => console.log(`Connected to mongodb successful!`))
            .catch( err => console.log('Connected failed', err))
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database
    }
}
const instanceMongodb = new Database()
module.exports = instanceMongodb