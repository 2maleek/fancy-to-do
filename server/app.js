const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: false } ))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log("Server running on PORT " + port)
})