const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const coffeeRouter = require("./coffee/coffee-router")
const restrict = require("./middleware/restrict")
const bodyParser = require('body-parser')
const server = express()
const port = process.env.PORT || 5000
const db = require('./database/data')

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'https://elastic-jackson-7f8963.netlify.app' );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
server.use(helmet())
server.use(cors())
server.use(express.json())

  //whitelist domain for cookies
  
  server.use(cors({
    credentials: true,
    origin: 'https://elastic-jackson-7f8963.netlify.app'
  }));
server.use(session({
	resave: false, // avoids recreating sessions that have not changed
	saveUninitialized: false, // comply with GDPR laws
    secret: "keep it secret, keep it safe",
    name: 'sessionCookie',
    cookie: {
      maxAge: 1000 * 60 * 60,
    //   secure: true,
      httpOnly: true
    },
	// store: new KnexSessionStore({
	// 	knex: db, // configured instance of Knex, or the live database connection
	// 	createtable: true, // if the session table does not exist, create it
	// }),
}))


server.use("/auth", authRouter)
server.use("/coffee", restrict(), coffeeRouter)

server.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to our API",
    })
})


server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})
