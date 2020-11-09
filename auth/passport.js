// load all the things we need
const Strategy = require('passport-local').Strategy
const User = require('../persistence/user')

// expose this function to our app using module.exports
module.exports = (passport) => {
  let clienterr
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
        User.signup(req, username, password, (err, res) => {
          if (err) {
            clienterr = err
          }
          callback(clienterr)
        })
      }
    )
  )

  // MySQL User Login via named 'local-login 'strategy
  passport.use(
    'local-login',
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, username, password, callback) => {
        // Find a user whose username is the same as the forms username
        // Check to see if the user trying to login already exists
        User.login(req, username, password, (err, res) => {
          if (err) {
            clienterr = err
          }
          callback(clienterr, res)
        })
      }
    )
  )
}
