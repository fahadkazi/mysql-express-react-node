const mysql = require('../connectors/mysql')

class User {
  signup(req, username, password, done) {
    const password = sha512(password)
    let query = `INSERT INTO reviews (title, description) VALUES (?, ?)`
    let params = [incoming.title, incoming.description]

    mysql.query('select * from ' + MYSQL_USER_TABLE + " where username = '" + username + "'", function (err, rows) {
      if (err) return done(err)
      if (rows.length) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'))
      } else {
        // Create the user if there is no user with that username
        var newUserMysql = new Object()

        newUserMysql.username = username
        newUserMysql.password = password // use the generateHash function in our user model

        var insertQuery =
          'INSERT INTO ' + MYSQL_USER_TABLE + " ( username, password ) values ('" + username + "','" + password + "')"

        mysql.query(insertQuery, function (err, rows) {
          newUserMysql.id = rows.insertId

          return done(null, newUserMysql)
        })
      }
    })

    mysql.query(query, params, (err, res) => {
      callback(err, res)
    })
  }
}

module.exports = new User()
