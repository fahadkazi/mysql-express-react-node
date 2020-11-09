const mysql = require('../connectors/mysql')

class Review {
  addreview(incoming, callback) {
    const query = `INSERT INTO reviews (title, description) VALUES (?, ?)`
    const params = [incoming.title, incoming.description]

    mysql.query(query, params, (err, res) => {
      callback(err, res)
    })
  }
}

module.exports = new Review()
