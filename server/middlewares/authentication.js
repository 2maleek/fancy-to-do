const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.access_token
    let decoded = jwt.verify(token, process.env.SECRET)
    next()
  } catch(err) {
    next({
      status: 401,
      message: 'Not authenticated!'
    })
  }
}