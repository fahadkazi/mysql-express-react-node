const async = require('async')
const mysql = require('../connectors/mysql')
const bcrypt = require('bcrypt')
class User {
  signup(req, username, pass, callback) {
    let clienterr
    const saltRounds = 10
    const password = bcrypt.hashSync(pass, saltRounds)
    const checkUser = (_callback) => {
      const query = `SELECT * from users WHERE username = '${username}'`
      mysql.query(query, [], (err, res) => {
        console.log('res', res, err)
        if (err) {
          clienterr = err
        } else if (res[0]) {
          clienterr = 'Username already exists'
        }
        _callback(clienterr)
      })
    }

    const createUser = (_callback) => {
      const query = `INSERT INTO users ( username, password ) VALUES (?, ?)`
      const params = [username, password]
      // Create the user if there is no user with that username
      const newUserMysql = new Object()

      newUserMysql.username = username
      newUserMysql.password = password // use the generateHash function in our user model

      mysql.query(query, params, (err, res) => {
        newUserMysql.id = res.insertId
        _callback(err, newUserMysql)
      })
    }

    async.waterfall([checkUser, createUser], (err, res) => {
      if (err || clienterr) {
        console.log(err)
        callback({ status: 'failed', message: clienterr })
      } else {
        callback({ status: 'success', data: res })
      }
    })
  }

  login(req, username, password, callback) {
    let clienterr
    const query = `SELECT * from users WHERE username = ?`
    const params = [username]
    mysql.query(query, params, (err, res) => {
      console.log('res pass', res[0].password)
      console.log('pass', password)
      if (err) {
        clienterr = err
      } else if (!res.length) {
        clienterr = 'Username does not exist!'
      } else if (!bcrypt.compareSync(password, res[0].password)) {
        clienterr = 'Invalid password!'
      }
      callback(clienterr)
    })
  }
}

module.exports = new User()
