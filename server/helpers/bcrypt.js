const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  hash: (password) => {
    return bcrypt.hash(password, saltRounds)
  },
  compare: (password, hashed) => {
    return bcrypt.compare(password, hashed)
  }
}