const { findMessageConversations } = require('../messages/messages.controllers')

const messageValidate = (req, res, next) => {
    const conversationId = req.params.conversation_id
    const userId = req.user.id

    findMessageConversations(userId, conversationId)
        .then(data => {
            if(data){
                next()
            } else {
                res.status(400).json({message: "You're not allow watch the information"})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}


module.exports = messageValidate
