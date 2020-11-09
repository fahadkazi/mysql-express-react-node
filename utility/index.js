const crypto = require('crypto')

module.exports = (data) => {
  return crypto.createHash('sha512').update(data, 'utf-8').digest('hex')
}
