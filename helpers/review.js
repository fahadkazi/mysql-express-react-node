const async = require('async')
const Review = require('../persistence/review')

class ReviewHelper {
  addreview(incoming, callback) {
    let clienterr
    const validate = (_callback) => {
      if (!incoming.title || !incoming.description) {
        clienterr = 'Missing required fields!'
      }
      _callback(clienterr)
    }

    const addreview = (_callback) => {
      Review.addreview(incoming, (err, res) => {
        if (err) {
          clienterr = err
        }
        _callback(clienterr)
      })
    }

    async.waterfall([validate, addreview], (err) => {
      if (err || clienterr) {
        console.log(err)
        callback({ status: 'failed', message: clienterr })
      } else {
        callback({ status: 'success' })
      }
    })
  }
}

module.exports = new ReviewHelper()
