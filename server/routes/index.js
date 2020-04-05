const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization  = require('../middlewares/authorization')

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.post('/googleSignIn', Controller.googleSignIn)
router.post('/githubSignIn', Controller.githubSignIn)
router.use(authentication)
router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.getAllTodos)
router.get('/users', Controller.getAllUser)

router.get('/todos/:id', authorization, Controller.getOneTodo)
router.put('/todos/:id', authorization, Controller.updateTodo)
router.delete('/todos/:id', authorization, Controller.deleteTodo)

module.exports = router