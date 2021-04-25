import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {createServer} from 'http'
import createRoutes from './core/routes'
import createSocket from './core/socket'
import path from 'path'

dotenv.config()

const app = express()
const server = createServer(app)
const io = createSocket(server)
createRoutes(app, io)

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
})

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    server.listen(PORT, () => console.log('Server is working on PORT ', PORT))
  } catch (error) {
    console.error('Error: ', error.message)
    process.exit(1)
  }
}

start()
