// const appMiddleware = require('./Middlewares/appMiddleware')
const router = require('./Router/router')


//import dotenv module
require('dotenv').config()

//import express module
const express = require('express')

require('./DB/connections')

//import cors modules
const cors = require('cors')

//create server using express
const pfServer = express()

//inject cors into pfServer
pfServer.use(cors())

//use middleware to covert JSON data to js object
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
//pfServer should expose the uploads folder

pfServer.use('/uploads',express.static('./uploads'))

//provide port 
const PORT = 4000

//run the server
pfServer.listen(PORT, () => {
    console.log(`pfServer is running in PORT ${PORT}`);
})

pfServer.get('/', (req, res) => {
    res.send('server for project fair is running and waiting for client requests')
})


