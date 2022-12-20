const router = require('express').Router()
const conversationServices = require('./conversations.services')
const messageServices = require('../messages/messages.services')
const passportJWT = require('../middlewares/auth.middleware')
const participantValidate = require('../middlewares/participantValidate.middleware')
const messageValidate = require('../middlewares/messageValidate.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConvesation)


router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getMessagesByConversation)
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.postMessage)

    
router.route('/:conversation_id/:messages_id')
.get(passportJWT.authenticate('jwt', {session: false}), messageValidate, messageServices.getMessagesById)
.delete(passportJWT.authenticate('jwt', {session: false}), messageValidate, messageServices.deleteMessage)

module.exports = router
