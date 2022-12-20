const Messages = require('../models/messages.models')
const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models')
const uuid = require('uuid')

const findAllMessages = async () => {
    const data = await Messages.findAll({
       
    })
    return data
}

const findMessagesById = async (id) => {
    const data = await Messages.findAll({

        include: {
            model: Conversations,
            include: {
                model: Users
            }
        }
    })
    return data
}

const findMessageConversations = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId: conversationId
        },
    })
    return data
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId : obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

const removeMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data
}



module.exports = {
    createMessage,
    findAllMessages,
    findMessageConversations,
    findMessagesById,
    removeMessage
}
