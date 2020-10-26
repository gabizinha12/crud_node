const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
PersonSchema.plugin(mongoosePaginate)

let PersonModel = model('Person', PersonSchema)

PersonModel.paginate().then({})

module.exports = model('Person', PersonSchema)
