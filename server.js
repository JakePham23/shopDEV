require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3052
const server = app.listen(PORT, ()=>{
    console.log(`localhost:${PORT}`)
})

process.on('SIGINT', () =>{
    server.close(() => console.log('Exit server express'))
})