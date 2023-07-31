const { logError, handleORMError, errorHandler, notFoundErrorHandler } = require('../middleware/error.middleware')

const errorRoutes = (app) => {
    app.use(logError)
    app.use(handleORMError)
    app.use(errorHandler)
    app.use(notFoundErrorHandler)
}

module.exports = errorRoutes