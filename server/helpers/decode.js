const jwt = require('jsonwebtoken')

module.exports = function (token) {
  try {
    let decoded = jwt.verify(token, process.env.SECRET)
    return decoded
  } catch(err) {
    next({
      status: 401,
      message: 'Not aunthenticated!'
    })
  }
}