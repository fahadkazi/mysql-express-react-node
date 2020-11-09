//MySQL User Login via named 'local-login 'strategy

const passport = require('passport')
const Strategy = require('passport-local').Strategy
const User = require('../persistence/user')

// MySQL User Signup via named 'local-signup 'strategy
passport.use(
  'local-signup',
  new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    (req, username, password, callback) => {
      // Find a user whose username is the same as the forms username
      // Check to see if the user trying to login already exists
    }
  )
)
