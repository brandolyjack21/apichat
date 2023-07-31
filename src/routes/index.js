const userRoutes = require('./user.router')

const apiRoutes = (app) => {
    app.use(userRoutes)
}

module.exports = apiRoutes