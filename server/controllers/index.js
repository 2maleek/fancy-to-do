const { Todo } = require('../models')

class Controller {
  static addTodo(req, res, next) {
    let { title, description, status, due_date } = req.body
    Todo.create({
        title,
        description,
        status,
        due_date,
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static getAllTodos(req, res, next) {
    Todo.findAll()
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
            res.status(200).json(data)
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
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = Controller