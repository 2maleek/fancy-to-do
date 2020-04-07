const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization  = require('../middlewares/authorization')

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.post('/googleSignIn', Controller.googleSignIn)
router.post('/githubSignIn', Controller.githubSignIn)

router.use(authentication)
router.post('/user', Controller.getUser)
router.get('/user', Controller.getInfoUser)
router.post('/members', Controller.addMember)
router.get('/members', Controller.getAllMember)

router.get('/projects', Controller.getAllProjects)

router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.getAllTodos)
router.get('/todos/:id', authorization, Controller.getOneTodo)
router.put('/todos/:id', authorization, Controller.updateTodo)
router.delete('/todos/:id', authorization, Controller.deleteTodo)

module.exports = router