'use strict'
const _SECOND = 5000
const mongoose = require('mongoose')
const os = require ('os')
const process = require('process')
// count connect
const countConnect = () =>{
    const numConnection = mongoose.connections.length
    console.log('Number of connections:', numConnection)
}


// check over load
const checkOverload = () => {
    // 5s
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        // Example maximum number connections base on number of cores
        const maxConnection = numCores * 5
        console.log('Memory usage: ', (memoryUsage / 1024 / 1024), 'MB')

        if(maxConnection > memoryUsage){
            console.log('Connection overload detected!')
            // notify.send

        }
    }, _SECOND)
}
module.exports = {
    countConnect,
    checkOverload,
}