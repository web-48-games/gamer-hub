/**
 * POST for users to send messages & for us to store on backend
 * GET existing messages when page loads
 * UPDATE messages
 * DELETE with host permissions otherwise receive error message
 * Schema defined in validator
 * Way to track timestamp of a message in schema
 **/


//import statement pulling Router "part" from express
import {Router} from 'express'
//import for message functions
import {
    postMessageController,
    deleteMessageByMessageIdController,
    getAllMessagesController,
    updateMessageByMessageIdController,
    getMessagesByMessageMeetupId,
    getMessagesByMessageProfileId, getMessagebyMessageId
} from "./message.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


//Starting path, can be modified to access different controllers or specific instances
const basePath = '/apis/messages'

//Instance of a Router
const router = Router()

//define endpoint for posting a message
router.route('/')
    .post(postMessageController)
    .get(getAllMessagesController)
router.route('/messageId/:messageId')
    .get(getMessagebyMessageId)
    .delete(isLoggedInController,deleteMessageByMessageIdController)
    .put(isLoggedInController,updateMessageByMessageIdController)
router.route('/messageMeetupId/:messageMeetupId')
    .get(getMessagesByMessageMeetupId)
router.route('/messageProfileId/:messageProfileId')
    .get(getMessagesByMessageProfileId)

//Authenticated Routes
export const messageRoute = {basePath, router}