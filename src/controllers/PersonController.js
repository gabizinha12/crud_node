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
  async pagination(req, res) {
    try {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit) // Make sure to parse the limit to number

      const offset = page ? page * limit : 0

      // We are using the '3 layer' architecture explored on the 'bulletproof node.js architecture'
      // Basically, it's just a class where we have our business logic

      let results = await Person.find({}) // You may want to add a query
        .skip(offset) // Always apply 'skip' before 'limit'
        .limit(limit)
        .select('-__v') // This is your 'page size'

      let numOfPersons = await Person.countDocuments({})

      res.status(200).json({
        message:
          'Paginating is completed! Query parameters: page = ' +
          page +
          ', limit = ' +
          limit,
        totalPages: Math.ceil(numOfPersons / limit),
        totalItems: numOfPersons,
        limit: limit,
        currentPageSize: results.length,
        customers: results,
      })
    } catch (error) {
      res.status(500).send({
        message: 'Error -> Can NOT complete a paging request!',
        error: error.message,
      })
    }
  },

  async index(req, res) {
    try {
      Person.find().then((person) => {
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
