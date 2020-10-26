const { Schema, model } = require('mongoose')

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  civil_status: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
})

module.exports = model('Person', PersonSchema)
