const userRoutes = require('./user.router')
const ConversationsRoutes = require('./conversations.routes')
const MessagesRouters = require('./messages.routes')

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(ConversationsRoutes);
    app.use(MessagesRouters)
}

module.exports = apiRoutes