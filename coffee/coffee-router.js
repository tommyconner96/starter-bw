const express = require('express')
const db = require("./coffee-model")
const router = express.Router()



// GET coffees
router.get('/', async (req, res, next) => {
  db
    .get()
    .then(coffee => {
      res.status(200).json(coffee)
    })
    .catch((error) => {
      next(error)
    })
})
//get coffee by id
router.get('/:id', async (req, res, next) => {
  db.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
})


module.exports = router
