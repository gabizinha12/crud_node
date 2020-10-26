const express = require('express')
const routes = express.Router()

const PersonController = require('./src/controllers/PersonController')

routes.get('/people', PersonController.index) // DONE
routes.get('/people/:id', PersonController.show) // DONE
routes.get('/people/pagination', PersonController.pagination)
routes.post('/person', PersonController.store) // DONE
routes.put('/person/:id', PersonController.update) // DONE
routes.delete('/folk/:id', PersonController.destroy) // DONE

module.exports = routes
