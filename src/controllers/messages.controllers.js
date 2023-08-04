const { Messages } = require('../models')
const { Participants } = require('../models')

const createMessages = async(req,res,next) => {
    try {
        const newMessage = req.body

        const message = await Messages.create(newMessage)
        res.status(201).json(message)
    } catch (error) {
        next(error)
    }
}

const collectMessages = async(req,res,next) => {
    try {
        const { id } = req.params
        const participantes = await Participants.findAll({
            where:{
                conversationId:id
            }
        })

        const { userId } = participantes

        const allMessages = await Messages.findAll({
            where:{
                conversationId:id
            }
        })

        const dataConversation =[participantes.map(participante => participante.dataValues.userId),allMessages]
        
        console.log(participantes);
        res.status(200).json(dataConversation)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createMessages,
    collectMessages
}