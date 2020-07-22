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

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await authModel.findByUsername(username).first()
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		if (user) {
			req.session.user = user
			console.log(req.session.user)
			res.status(200).json({
				message: `Welcome ${user.username}!`,
			})
		} else {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// // hash the password again and see if it matches what we have in the database


		// if (!passwordValid) {
		// 	return res.status(401).json({
		// 		message: "Invalid Credentials",
		// 	})
		// }

		// // generate a new session for this user,
		// // and sends back a session ID
		// req.session.user = user
		// console.log(res.session.user = user)

		// res.json({
		// 	message: `Welcome ${user.username}!`,
		// })
	} catch (err) {
		next(err)
	}
})

// router.post("/login", async (req, res, next) => {
// 	const authError = {
// 		message: "Invalid Credentials",
// 	}

// 	try {
// 		const user = await authModel.findByUsername(req.body.username)
// 		if (!user) {
// 			return res.status(401).json(authError)
// 		}

// 		const passwordValid = await bcrypt.compare(req.body.password, user.password)
// 		if (!passwordValid) {
// 			return res.status(401).json(authError)
// 		}

// 		// create a new session in the database
// 		const session = await authModel.add({
// 			user_id: user.id,
// 			// a SQLite trick to set a date in the future
// 			expires: db.raw("DATETIME('now', 'localtime', '+1 hour')"),
// 		})

// 		// add the session details and other user details to the token payload
// 		const token = jwt.sign({
// 			sessionId: session.id,
// 			username: user.username,
// 		}, 'secret secret')

// 		res.cookie("token", token)
// 		req.session.user = user
// 		res.json({
// 			message: `Welcome ${user.username}!`, token
// 		})
// 	} catch(err) {
// 		next(err)
// 	}
// })

// router.post('/login', (req, res, next) => {
// 	const { username, password } = req.body
// 	authModel
// 		.findByUsername(username)
// 		.then(user => {
// 			if (user && bcrypt.compareSync(password, user.password)) {
// 				//adds jwt token
// 				const token = createToken(user)
// 				req.session.user = user
// 				res.cookie("token", token)
// 				//adds session 
// 				res.status(200).json({ message: `Hi ${user.username}! have a token:`, token })
// 			} else {
// 				res.status(401).json({ message: "Invalid credentiels" })
// 			}
// 		})
// 		.catch(err => next(err))
// })

// router.get("/logout", restrict, async (req, res, next) => {
// 	try {
// 		await authModel.deleteById(req.session.id)

// 		res.cookie("token", "", { maxAge: 0 })
// 		res.status(204).end()
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.get("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
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