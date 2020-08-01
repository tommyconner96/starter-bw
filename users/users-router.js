const express = require("express")
const Users = require("./users-model")
const bcrypt = require("bcryptjs")
const router = express.Router()

// GET users
router.get("/", async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch (err) {
        next(err)
    }
})
// GET users BY id
router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    Users
        .findById(id)
        .then(payload => {
            if (payload) {
                res.json(payload)
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' })
            }
        })
        .catch(err => {
            next(err)
        })
})

// PUT (update) user (by ID)
router.put('/:id', async (req, res, next) => {
    const newPass = req.body.password
    const hashPass = await bcrypt.hash(newPass, 12).catch(err => next(err))
    const updateBody = {
        "username": req.body.username,
        "password": hashPass,
        "phoneNumber": req.body.phoneNumber
    }
    if (!req.body.phoneNumber || !req.body.password || !req.body.username) {
        return res.status(400).json({ message: "please provide a username, password and phone number!" })
    }
    Users
        .findById(req.params.id)
        .then(payload => {
            console.log(payload)
            if (!payload) {
                res.status(404).json({ message: 'Could not find user with given id.' })

            } else {
                Users.update(req.params.id, updateBody)
                    .then(updated => {
                        res.status(200).json({ message: `updated user: ${req.params.id}`, updated })
                    })
                    .catch(err => {
                        next(err)
                    })
            }
        })
})

module.exports = router
