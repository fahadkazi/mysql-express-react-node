const crypto = require('crypto')

export const sha512 = (data) => {
  return crypto.createHash('sha512').update(data, 'utf-8').digest('hex')
}
