const router = require('express').Router()
const Controller = require('../controllers')

router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.getAllTodos)
router.get('/todos/:id', Controller.getOneTodo)
router.put('/todos/:id', Controller.getOneTodo)
router.delete('/todos/:id', Controller.deleteTodo)

module.exports = router