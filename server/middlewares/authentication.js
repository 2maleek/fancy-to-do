const decode = require('../helpers/decode')
const { User } = require('../models')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.access_token
    let userData = decode(token)
    return User.findOne({
      where: { email: userData.email }
    })
    .then(user => {
      if(user){
        next()
      }else{
        next({ status: 404, message: 'user not found!' })
      }
    })
  } catch(err) {
    next({
      status: 401,
      message: 'Not authenticated!'
    })
  }
}