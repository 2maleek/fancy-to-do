const { Todo, User, Member } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const decode = require('../helpers/decode')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const axios = require('axios')

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
        next({status: 404, message: 'user not registered!'})
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
          next({status: 409, message: 'Email Already registered!'})
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

  static googleSignIn(req, res, next) {
    let token  = req.body.token
    let email = null
    let name = null

    client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID
		})
		.then(ticket => {
			return ticket.getPayload()
		})
		.then(payload => {
      email = payload.email
      name = payload.name
			return User.findOne({
				where: {
					email: payload.email
				}
			})
		})
		.then(data => {
			if(!data){
				return User.create({
          name: name,
					email: email,
					password: '123'
				})
			}else{
        return data 
			}
		})
		.then(data => {
      let token = jwt.sign({
        UserId: data.id,
        name: data.name,
        email: data.email,
      }, process.env.SECRET, { expiresIn: 60 * 60 })
      res.status(200).json({access_token: token})
    })
    .catch(err => {
    })
  }

  static githubSignIn(req, res, next) {
    const CLIENT_ID = process.env.CLIENT_ID_GITHUB
    const CLIENT_SECRET = process.env.CLIENT_SECRET_GITHUB
    const {requestToken} = req.body
    let email, name

    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
      headers: {
        accept: 'application/json'
      }
    })
    .then(response => {
      const access_token = response.data.access_token
      return axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
          Authorization: `token ${access_token}`
        }
      })
    })
    .then(info => {
      email = `${info.data.login}@github.com`
      name = info.data.name
      return User.findOne({
        where: { email }
      })
    })
    .then(isFound => {
      if(isFound) {
        return isFound
      }else {
        return User.create({
          name,
          email,
          password: '123'
        })
      }
    })
    .then(user => {
      let token = jwt.sign({
        UserId: user.id,
        name: user.name,
        email: user.email,
      }, process.env.SECRET, { expiresIn: 60 * 60 })
      res.status(200).json({access_token: token})
    })
    .catch(err => {
      if(err.response.status === 401){
        next({status: 401, message: 'Bad credentials'})
      }else{
        next(err)
      }
    })
  }

  static addTodo(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId

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
    Todo.findByPk(id)
    .then(isFound => {
      if(isFound){
        return Todo.update(input, {
          where: { id }
        })
      }else {
        next({status: 404, message: 'Todo not found!'})
      }
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

    let data;
    Todo.findByPk(id)
      .then(isFound => {
        if(isFound){
          data = isFound
          return Todo.destroy({
            where: { id }
          })
        }else{
          next({status: 404, message: 'Todo not found!'})
        }
      })
      .then(() => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static addMember(req, res, next) {
    let userData = decode(req.headers.access_token)
    let OwnerId = userData.UserId
  
    let { UserId, TodoId } = req.body
    let input = {
      UserId,
      TodoId,
      OwnerId
    }
    Member.create(input)
    .then(newMember => {
      res.status(201).json(newMember)
    })
    .catch(err => {
      next(err)
    })
  }

  static getAllMember(req, res, next) {
    let userData = decode(req.headers.access_token)
    let OwnerId = userData.UserId

    console.log('>>>>>>>>>>>>>>>>>>>')
    Member.findAll({
      where: { OwnerId },
      include: [ Todo, User ]
    })
    .then(members => {
      console.log('<<<<<<<<<<<<<<')
      if(members){
        res.status(200).json(members)
      }else {
        next({status: 404, message: 'Member not found'})
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static getUser(req, res, next) {
    const { email } = req.body
    User.findOne({
      where: { email }
    })
    .then(users => {
      if(users){
        res.status(200).json(users)
      }else {
        next({status: 404, message: 'User not found'})
      }
    })
    .catch(err => {
    })
  }

  static getInfoUser(req, res, next) {
    let userData = decode(req.headers.access_token)
    res.status(200).json(userData)
  }

  static getAllProjects(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId

    console.log('>>>>>>>>>>>>>>>>>>>')
    Member.findAll({
      where: { UserId },
      include: [ Todo ]
    })
    .then(members => {
      console.log('<<<<<<<<<<<<<<')
      if(members){
        res.status(200).json(members)
      }else {
        next({status: 404, message: 'Member not found'})
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = Controller