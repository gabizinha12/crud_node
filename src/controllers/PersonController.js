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
    let query = {}
    let page = req.query.page
    let limit = 10
    let skip = limit * (page - 1)
    try {
      Person.find(query)
        .skip(skip)
        .limit(limit)
        .exec()
        .then((person) => {
          res.send(person)
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
