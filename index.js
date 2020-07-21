const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const coffeeRouter = require("./coffee/coffee-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cookieParser())
server.use(express.json())
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://starter-bw.herokuapp.com/" );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
server.use(cors())

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
