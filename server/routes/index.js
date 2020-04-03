const router = require('express').Router()
const Controller = require('../controllers')

router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.getAllTodos)
router.get('/todos/:id', Controller.getOneTodo)
router.put('/todos/:id', Controller.updateTodo)
router.delete('/todos/:id', Controller.deleteTodo)

module.exports = router