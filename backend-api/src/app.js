const express = require('express')
const cors = require('cors')
const path = require('path')
const JSend = require('./utils/jsend')
const cookieParser = require('cookie-parser')

const postsRouter = require('./routes/posts.route')
const categoriesRouter = require('./routes/categories.route')
const usersRouter = require('./routes/users.route')
const indexRouter = require('./routes/index.route')

const {
    resourceNotFound,
    handleError
} = require('./controllers/errors.controller')

const { specs, swaggerUi } = require('./docs/swagger')
const { authenticateToken } = require('./utils/manipulateToken')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
console.log(__dirname)
app.use('/avatars', express.static(path.join(__dirname,'public/avatars')))
app.use('/thumbnails', express.static(path.join(__dirname,'public/thumbnails')))


indexRouter.setup(app)
usersRouter.setup(app)
postsRouter.setup(app)
categoriesRouter.setup(app)


// Handle 404 response
// app.use(resourceNotFound)

// Define error-handing middleware last, after other app.use() and routes calls
// app.use(handleError)

module.exports = app;