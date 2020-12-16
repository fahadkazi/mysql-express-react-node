const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/signup', (req, res) => {
  passport.authenticate('local-signup', (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.send(user)
    }
  })(req, res)
})

router.post('/login', (req, res) => {
  passport.authenticate('local-login', (err, user) => {
    console.log(err, user)
    if (err) {
      res.send({ status: 'failed', message: err })
    } else {
      res.send({ status: 'success', message: 'Logged in succesfully!' })
    }
  })(req, res)
})

module.exports = router
