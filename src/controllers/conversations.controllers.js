const { Conversations, Participants, Messages } = require("../models");

const createConversation = async (req, res, next) => {
  try {
    // body: { createdBy: 2, participant: 4  }
    const { createBy, participants, type } = req.body;
    // crear la conversacion
    const conversation = await Conversations.create({ createBy, type });
    // conversation = { id, title, creattedBy, type, createdAt, updatedAt}
    // tomar el id de la conversacion creada y agreagar a los participantes
    const { id } = conversation;
    // agregar a los participantes en la tabla pivote
    const participitantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));
    participitantsArray.push({ userId: createBy, conversationId: id });
    await Participants.bulkCreate(participitantsArray);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    // antes de eliminar la conversacion 3
    // elimino todos los registros en participantes que usen ese id
    await Conversations.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const allConversations = async(req,res,next) => {
      try {
        const { id } = req.params

        const allConversations = await Participants.findAll({
          where:{
            userId:id
          }
        })

        res.status(201).json(allConversations)
      } catch (error) {
        next(error)
      }
}

module.exports = {
  createConversation,
  deleteConversation,
  allConversations
};