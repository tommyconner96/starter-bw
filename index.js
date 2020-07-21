const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const coffeeRouter = require("./coffee/coffee-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.env.PORT || 5000

require('dotenv').config(); // add this line as the first thing to run1

server.use(helmet())
server.use(cookieParser())
server.use(express.json())

server.use(cors({
	credentials: true
}))

server.use("/auth", authRouter)
server.use("/coffee", restrict(), coffeeRouter)

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
