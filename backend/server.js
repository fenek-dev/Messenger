const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

require("dotenv").config();

const PORT = config.get('port') || 5000

app.use(express.json({type: 'text/plain'}))
app.use(express.json())
 
app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=> console.log('Server is working'))
    } catch (error) {
        console.log('Error: ', error.message);
        process.exit(1)
    }
 
}

start()

