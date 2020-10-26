const Person = require('../models/Person')
module.exports = {
  async show(req, res) {
    try {
      Person.find().then((person) => {
        res.send(person)
      })
    } catch (err) {
      return res.status(400).send({ error: 'Couldnt find register' })
    }
  },
  async index(req, res) {
    try {
      var pageNo = req.params.page // parseInt(req.query.pageNo)
      var size = req.params.perPage
      var query = {}
      if (pageNo < 0 || pageNo === 0) {
        response = {
          error: true,
          message: 'invalid page number, should start with 1',
        }
        return res.json(response)
      }
      query.skip = size * (pageNo - 1)
      query.limit = parseInt(size)
      // Find some documents
      Person.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { error: true, message: 'Error fetching data' }
        } else {
          response = { error: false, message: data }
        }
        res.json(response)
      })
    } catch (err) {
      return res.status(400).send({ error: 'Couldnt find register' })
    }
  },
  async store(req, res) {
    try {
      const person = await Person.create(req.body)
      return res.send(person)
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  },
  async update(req, res) {
    Person.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        civil_status: req.body.civil_status,
        cpf: req.body.cpf,
        city: req.body.city,
        state: req.body.state,
      },
      { new: true }
    )
      .then((person) => {
        if (!person) {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          })
        }
        res.send(person)
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          })
        }
        return res.status(500).send({
          message: 'Error updating person with id ' + req.params.id,
        })
      })
  },
  async destroy(req, res) {
    Person.findByIdAndRemove(req.params.id)
      .then((person) => {
        if (!person) {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          })
        }
        res.send({ message: 'Person deleted successfully!' })
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          })
        }
        return res.status(500).send({
          message: 'Could not delete person with id ' + req.params.id,
        })
      })
  },
}
