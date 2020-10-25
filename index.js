const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const server = express()

server.use('*', cors())

mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

mongoose
  .connect(
    'mongodb+srv://softwrap:softwrap@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connected to db')
  })

server.get('/', function (req, res, next) {
  res.status(200).send('Hi, It works!')
})

server.use(express.json())
server.use(bodyParser.json())
server.use('/api', require('./routes'))

const port = process.env.PORT || 1337
server.listen(port)
