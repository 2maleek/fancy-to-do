const { Todo } = require('../models')
const decode = require('../helpers/decode')

module.exports = (req, res, next) => {
  let id = Number(req.params.id)
  let userData = decode(req.headers.access_token)
  let UserId = userData.UserId

  Todo.findOne({
    where: { id }
  })
  .then(data => {
    if(data){
      if(data.UserId === UserId) {
        next()
      }else {
        next({ status: 403, message: 'Forbidden access!'})
      }
    }else {
      next({ status: 404, message: 'Todo not found! '})
    }
  })
  .catch(err => {
    next(err)
  })
}