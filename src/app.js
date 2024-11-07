const express = require('express')
const morgan = require('morgan')
const {default: helmet} = require('helmet')
const compression = require('compression')
const app = express()



// init middleware
app.use(morgan('tiny'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//init db
require('./dbs/init.mongodb')
// const {checkOverload} = require('../src/helpers/check.connect')
// checkOverload()
// init routes
app.use('/', require('./routes/index'))
//handle error


module.exports = app