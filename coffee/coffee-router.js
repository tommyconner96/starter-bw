const express = require('express')
const db = require("./coffee-model")
const router = express.Router()



// GET coffees
router.get('/', (req, res, next) => {
  db
    .get()
    .then(coffee => {
      res.status(200).json(coffee)
    })
    .catch((error) => {
      next(error)
    })
})
//get user by id
router.get('/:id', (req, res, next) => {
  db.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
})
//get users posts by user ID
// router.get('/:id/posts', validateUserId, (req, res, next) => {
//   db.getUserPosts(req.params.id)
//     .then(posts => {
//       res.status(200).json(posts)
//     })
//     .catch((error) => {
//       next(error)
//     })
// })



// //custom middleware

// function validateUserId(req, res, next) {
//   db.getById(req.params.id)
//     .then(user => {
//       if (user) {
//         req.user = user
//         next()
//       } else {
//         res.status(400).json({ error: "Invalid User ID." })
//       }
//     })
//     .catch((error) => {
//       next(error)
//     })
// }

// function validateUser(req, res, next) {
//   if (Object.keys(req.body).length !== 0) {
//     req.body.name
//       ? next()
//       : res.status(400).json({
//         error: "missing required name field"
//       })
//   } else {
//     res.status(400).json({
//       error: "missing user data"
//     })
//   }
// }

// function validatePost(req, res, next) {
//   if (Object.keys(req.body).length !== 0) {
//     req.body.text
//       ? next()
//       : res.status(400).json({
//         error: "Missing Required text field."
//       })
//   } else {
//     res.status(400).json({
//       error: "Missing post data"
//     })
//   }
// }

module.exports = router
