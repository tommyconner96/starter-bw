const express = require("express")
const coffee = require("./coffee-model")
const users = require("../users/users-model")

const router = express.Router()

// GET coffee
router.get("/:id/coffee", async (req, res, next) => {
    const { id } = req.params
    users
        .findById(id)
        .then(payload => {
            if (payload) {
                coffee
                    .find(id)
                    .then(coffee => {
                        if (coffee === undefined || coffee.length == 0) {
                            res.status(404).json({ message: "no coffee found for this user" })
                        } else {
                            res.status(200).json(coffee)
                        }

                    })
                    .catch((err) => next(err))
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' })
            }
        })


})

// GET coffee BY id
router.get('/:user_id/coffee/:coffeeID', async (req, res, next) => {

    coffee
        .findByID(req.params.user_id, req.params.coffeeID)
        .then(coffee => {
            if (coffee) {
                res.json(coffee)
            } else {
                res.status(404).json({ message: 'Could not find coffee with given id.' })
            }
        })
        .catch(err => next(err))
})


// POST coffee
router.post('/:id/coffee', async (req, res, next) => {
    const { id } = req.params

    if (!req.body.origin || !req.body.notes) {
        return res.status(400).json({ message: "Please include origin and notes" })
    }
    users
        .findById(id)
        .then(payload => {
            if (payload) {
                coffee
                    .create({
                        "user_id": id,
                        "notes": req.body.notes,
                        "origin": req.body.origin
                    })
                    .then(newCoffee => {
                        res.status(201).json({ newCoffee })
                    })
                    .catch(err => next(err))
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' })
            }
        })

})

// DELETE coffee
router.delete('/:id/coffee/:coffeeID', async (req, res, next) => {

    coffee
        .findByID(req.params.id, req.params.coffeeID)
        .then((payload) => {
            if (payload) {
                coffee
                    .remove(req.params.coffeeID, req.params.id)
                    .then(deleted => {
                        res.status(200).json({ message: `successfully deleted coffee id ${req.params.coffeeID} by user id ${req.params.id}`, removed: deleted })
                    })
                    .catch(err => {
                        next(err)
                    })
            } else {
                return res.status(404).json({ message: "invalid user id or coffee id" })
            }
        })
})

// PUT (update) plant BY id
router.put('/:id/coffee/:coffeeID', async (req, res, next) => {
    const updateBody = {
        "user_id": req.params.id,
        "id": req.params.coffeeID,
        "origin": req.body.origin,
        "notes": req.body.notes
    }
    if (!req.body.origin || !req.body.notes) {
        res.status(400).json({ message: "please include origin and notes in the request" })
    }
    coffee
        .findByID(req.params.id, req.params.coffeeID)
        .then((payload) => {
            if (payload) {
                coffee
                    .update(req.params.coffeeID, req.params.id, updateBody)
                    .then(updated => {
                        res.status(200).json({ message: `updated coffee: ${req.params.coffeeID}`, updated })
                    })
                    .catch(err => {
                        next(err)
                    })
            } else {
                return res.status(404).json({ message: "that coffee doesn't exist!" })
            }
        })

})

module.exports = router
