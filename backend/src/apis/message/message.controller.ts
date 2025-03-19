//import for function parameters
import {Request, Response} from 'express'
import {z} from "zod";
import {zodErrorResponse} from "../../utils/response.utils";
import {MessageSchema} from "./message.validator";
import {
    deleteMessageByMessageId,
    insertMessage,
    Message,
    selectAllMessages,
    selectMessageByMessageId
} from "./message.model";
import {Status} from "../../utils/interfaces/Status";
import {PublicProfile} from "../profile/profile.model";
import {Meetup, selectMeetupByMeetupId} from "../meet-up/meet-up.model";

/**
 * @param request object containing message
 * @param response contains status of the request for posted message
 */
export async function postMessageController(request: Request, response: Response): Promise<Response> {
    try {

        //set up to validate what comes through from the request parameter
        const validationResult = MessageSchema.safeParse(request.body) //.params might be .body

        //if validation fails, return a response to the client; error on the clients end
        //functions as a success check before continuing rest of message process
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        //deconstruct Message request data from validated result
        const {messageId, messageProfileId, messageMeetupId, messageContent, messageTimestamp} = validationResult.data

        //declared message variable using MessageSchema properties
        const newMessage = {messageId, messageProfileId, messageMeetupId, messageContent, messageTimestamp}

        //awaiting results of insertMessage, refer to message.model.ts
        const messageUpload= await insertMessage(newMessage)

        //success message when testing on insomnia; last thing to happen on try block
        return response.json({status: 200, message: messageUpload, data: null})

        //returned error to user if anything goes wrong
    } catch(error) {
        //seen in droplet console
        console.error(error)
        return response.json({status: 500, message: error.message, data: []})
    }
}

//function to get pre-existing messages in a meetup
export async function getAllMessagesController(request: Request, response: Response) {
    try {

        //get messages from database and store in a variable called messageData
        const messageData = await selectAllMessages()

        //return the response within status code 200, a message, and messages as data
        const status: Status = {status: 200, message: null, data: messageData}
        return response.json(status)

        //if there is an error, return the response with the status code 500, an error message, and null data
        } catch {
        return response.json({
            status: 500,
            message: 'Error getting messages, please try again',
            data: []
        })
    }
}

 //function to delete a message by messageId with host permissions
export async function deleteMessageByMessageIdController (request: Request, response: Response): Promise<Response> {
    try {

        //validate incoming request with message uuid schema
        const validationResult = z.string().uuid({message: 'Please provide a valid messageId or null'}).safeParse(request.params.messageId)

        //if validation fails, return response to client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        //pulling profile from session
        const profile: PublicProfile = request.session.profile as PublicProfile

        //set message profile Id
        const messageProfileId: string = profile.profileId as string
        console.log(messageProfileId)
        //get message id from request parameters
        const messageId = validationResult.data

        //delete message from database by message
        const message: Message | null = await selectMessageByMessageId(messageId)

        if(message === null) {
            return response.json({status: 404, message: 'Message not found', data: null})
        }

        const meetup: Meetup | null = await selectMeetupByMeetupId(message.messageMeetupId)

        // if not person that made message and not person that made meetup, not allowed to delete message
        if(message?.messageProfileId !== messageProfileId && meetup?.meetupHostProfileId !== messageProfileId) {
            return response.json ({
                status: 403,
                message: 'You are not allowed to delete this message',
                data: null
            })
        }

        //Delete the message from the database by message id
        const result = await deleteMessageByMessageId(messageId)

        return response.json({status: 200, message: result, data: null})


    } catch (error) {
        return response.json({
            status: 500,
            message: error.message, data: []})
    }
}
