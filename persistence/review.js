const mysql = require('../connectors/mysql')

class Review {
  addreview(incoming, callback) {
    let query = `INSERT INTO reviews (title, description) VALUES (?, ?)`
    let params = [incoming.title, incoming.description]

    mysql.query(query, params, (err, res) => {
      callback(err, res)
    })
  }
}

module.exports = new Review()
