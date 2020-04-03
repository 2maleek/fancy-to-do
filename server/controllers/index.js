const { Todo, User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const decode = require('../helpers/decode')

class Controller {
  static login(req, res, next) {
    let { email, password } = req.body
    let UserId, name;

    User.findOne({
      where: { email }
    })
    .then(user => {
      if(user){
        UserId = user.id
        name = user.name
        return compare(password, user.password)
      }else{
        next({status: 400, message: 'user not registered!'})
      }
    })
    .then(result => {
      if(result){
        let token = jwt.sign({
          UserId,
          name,
          email,
        }, process.env.SECRET, { expiresIn: 60 * 60 })
        res.status(200).json({access_token: token})
      }else{
        next({status: 400, message:'Wrong Password!'})
      }
     
    })
    .catch(err => {
      next(err)
    })
  }

  static register(req, res, next) {
    let { name, email, password } = req.body
    User.findOne({
      where: { email }
    })
      .then(user => {
        if(user){
          next({status: 400, message: 'Email has been registered!'})
        }else {
          return User.create({
            name,
            email,
            password
          })
        }
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        next(err)
      })
  }

  static addTodo(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId

    console.log(userData)
    let { title, description, status, due_date } = req.body
    Todo.create({
        title,
        description,
        status,
        due_date,
        UserId,
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllTodos(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId

    Todo.findAll({
      where : { UserId }
    })
      .then(data => {
        if(data) {
          res.status(200).json(data)
        }else{
          next({status: 404, message: 'Todos is empty!'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static getOneTodo(req, res, next) {
    let id = req.params.id
    Todo.findOne({
        where: { id }
    })
      .then(data => {
        if(data){
          res.status(200).json(data)
        }else{
          next({status: 404, message: 'Todo not found!'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTodo(req, res, next) {
    let id = req.params.id
    let { title, description, status, due_date } = req.body
    let input = {
        title,
        description,
        status,
        due_date,
    }
    Todo.update(input, {
      where: { id }
    })
      .then(() => {
        return Todo.findOne({
          where: { id }
        })
      })
      .then(data => {
          if(data){
            res.status(200).json({message: 'updated!', data})
          }else{
            next({status: 404, message: 'Todo not found!'})
          }
        })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
    let id = req.params.id

    Todo.destroy({
      where: { id }
    })
      .then(data => {
        res.status(200).json({message: 'deleted!'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller