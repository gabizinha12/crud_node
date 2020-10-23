const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const server = express();


mongoose.connect('mongodb+srv://softwrap:softwrap@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('foi carai')
}).catch((err) => {
    console.log('deu pau' + err);
})
server.use(cors())
server.use(express.json())
server.use(bodyParser.json())
server.use('/api', require('./routes'));
  

server.listen(3000);