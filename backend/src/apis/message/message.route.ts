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

//Starting path, can be modified to access different controllers or specific instances
const basePath = '/apis/like'

//Instance of a Router
const router = Router()
