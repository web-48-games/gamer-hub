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
import {postMessageController} from "./message.controller";


//Starting path, can be modified to access different controllers or specific instances
const basePath = '/apis/message'

//Instance of a Router
const router = Router()

//define endpoint for posting a message
router.route('/').post(postMessageController)

//Authenticated Routes
export const messageRoute = {basePath, router}