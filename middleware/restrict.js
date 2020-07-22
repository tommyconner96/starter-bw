// // // const jwt = require("jsonwebtoken")
// // // const authModel = require("../auth/auth-model")

// // // function restrict() {
// // // 	return async (req, res, next) => {
// // // 		const authError = {
// // // 			message: "Invalid credentials",
// // // 		}

// // // 		try {
// // // 			const token = req.cookies.token
// // //  			if (!token) {
// // // 				return res.status(401).json(authError)
// // // 			}

// // // 			jwt.verify(token, 'secret secret', async (err, decoded) => {
// // // 				try {
// // // 					// validate role based on a scale, so admins can
// // // 					// still access resources restricted to normal users
// // // 					if (err) {
// // // 						return res.status(401).json(authError)
// // // 					}

// // // 					// look up session from database and make sure it's not expired
// // // 					req.session = await authModel.findById(decoded.sessionId)
// // // 					if (!req.session || new Date(req.session.expires) <= new Date()) {
// // // 						return res.status(401).json(authError)
// // // 					}

// // // 					next()
// // // 				} catch(err) {
// // // 					next(err)
// // // 				}
// // // 			})
// // // 		} catch(err) {
// // // 			next(err)
// // // 		}
// // // 	}
// // // }

// // // module.exports = restrict

// // module.exports = (req, res, next) => {
// //     if (req.session && req.session.user) {
// //         next()
// //     } else {
// //         res.status(401).json({ message: "Unauthorized User!" })
// //     }
// // }

// const jwt = require("jsonwebtoken")

// function restrict() {
// 	return async (req, res, next) => {
// 		const authError = {
// 			message: "Invalid credentials",
// 		}

// 		try {
// 			// manually pull the token that got sent from the client's cookie jar
// 			const token = req.cookies.token
// 			if (!token) {
// 				return res.status(401).json(authError)
// 			}

// 			//checks to make sure the signature is valid and the token is not expired
// 			jwt.verify(token, "secret secret", (err, decoded) => {
// 				if (err) {
// 					return res.status(401).json(authError)
// 				}
// 				next()
// 			})
// 		} catch(err) {
// 			next(err)
// 		}
// 	}
// }

// module.exports = restrict

const bcrypt = require("bcryptjs")
const Users = require("../auth/auth-model")

function restrict() {
	const authError = {
		message: "Invalid credentials",
	}
	
	return async (req, res, next) => {
		try {
// 			const { username, password } = req.headers
// 			// make sure the values are not empty
// 			if (!username || !password) {
// 				return res.status(401).json(authError)
// 			}
// 
// 			const user = await Users.findBy({ username }).first()
// 			// make sure the user exists in the database
// 			if (!user) {
// 				return res.status(401).json(authError)
// 			}
// 
// 			const passwordValid = await bcrypt.compare(password, user.password)
// 			// make sure the password is correct
// 			if (!passwordValid) {
// 				return res.status(401).json(authError)
// 			}

			if (!req.session || !req.session.user) {
				return res.status(401).json({authError})
			}

			// if we reach this point, the user is considered authorized!
			next()
		} catch (err) {
			next(err)
		}
	}
}

module.exports = restrict
