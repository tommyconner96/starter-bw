const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authModel = require("./auth-model")
const restrict = require("../middleware/restrict")
const db = require("../database/data")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await authModel.findByUsername(username)

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await authModel.addUser(req.body))
	} catch (err) {
		next(err)
	}
})

router.post('/login', (req, res, next) => {
	const { username, password } = req.body
	authModel
		.findByUsername(username)
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				//adds jwt token
				const token = createToken(user)
				// req.session.user = user
				res.cookie("token", token, {sameSite: none, secure: true, httpOnly: true})
				//adds session 
				res.status(200).json({ message: `Hi ${user.username}! have a token:`, token })
			} else {
				res.status(401).json({ message: "Invalid credentiels" })
			}
		})
		.catch(err => next(err))
})


router.get("/logout", async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: "you have successfully logged out"})
})

function createToken(user) {
	const payload = {
		username: user.username,
		id: user.id,
	}
	const secret = 'secret secret'

	const options = {
		expiresIn: '1d',
	}
	return jwt.sign(payload, secret, options)
}

module.exports = router