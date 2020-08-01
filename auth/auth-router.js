const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authModel = require("./auth-model")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, phoneNumber } = req.body
		const user = await authModel.findBy({ username }).first()
		if (!username || !password || !phoneNumber) {
			res.status(401).json({ message: "You need to have a username, password, and phoneNumber" })
		}
		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}
		const newUser = await authModel.addUser({
			username,
			// hash the password with a time complexity of "12"
			password: await bcrypt.hash(password, 12),
			phoneNumber
		})

		res.status(201).json(newUser)
	} catch (err) {
		next(err)
	}
})

router.post('/login', (req, res, next) => {
	const { username, password } = req.body
	authModel
		.findBy({ username }).first()
		.then(user => {
			if (!req.body.username || !req.body.password) {
				return res.status(400).json({ message: "Please include username and password!" })
			}
			if (user && bcrypt.compareSync(password, user.password)) {
				//adds jwt token
				const token = createToken(user)

				// change to this when deployed. on localhost it breaks it.
				// res.cookie("token", token, { SameSite: 'none', secure: true, httpOnly: true })
				res.cookie("token", token)
				res.status(200).json({ message: `Hi ${user.username}! have a token:`, token, user_id: user.id })
			} else {
				res.status(401).json({ message: "Invalid credentiels" })
			}
		})
		.catch(err => next(err))
})

// remind frontend to also clear the token from local storage. 
// upon logout. this only clears the cookie so theyre still authenticated
router.get("/logout", async (req, res, next) => {
	res.clearCookie("token")
	res.json({ message: "you have successfully logged out" })
})

function createToken(user) {
	const payload = {
		username: user.username,
		id: user.id,
	}
	const secret = process.env.TOP_SECRET

	const options = {
		expiresIn: '1d',
	}
	return jwt.sign(payload, secret, options)
}

module.exports = router