const express = require('express')
require('dotenv').config()
const morgan = require('morgan')

const userRoutes = require('./routes/user.router')
const { errorHandler, logError, handleORMError, notFoundErrorHandler } = require('./middleware/error.middleware')
const apiRoutes = require('./routes')
const errorRoutes = require('./routes/error.routes')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
const PORT = process.env.PORT ?? 8000

app.use(userRoutes)

app.get('/', (req,res) => {
 res.send('todo bien por aqui')
})

apiRoutes(app)

errorRoutes(app)

app.listen(PORT, () => {
    console.log('servidor eschucando');
})