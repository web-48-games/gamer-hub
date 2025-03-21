import {RsvpSchema} from "./rsvp.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {Request, Response} from "express";
import {Status} from "../../utils/interfaces/Status";
import {insertRsvp, selectRsvpsByRsvpProfileId} from "./rsvp.model";


export async function postRsvpcontroller(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = RsvpSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {rsvpProfileId, rsvpMeetupId, rsvpAt} = validationResult.data

        const rsvp = {rsvpProfileId, rsvpMeetupId, rsvpAt}

        const result = await insertRsvp(rsvp)

        const status: Status = {status: 200, data: null, message: result}

        return response.json(status)
    }catch (error) {
        console.error(error)
        return response.json({status: 500, data: null, message: error.message})
        }
}

export async function getRsvpByRsvpProfileIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = RsvpSchema.pick({rsvpProfileId: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {rsvpProfileId} = validationResult.data

        const data = await selectRsvpsByRsvpProfileId(rsvpProfileId)

        const status: Status = {status: 200, data, message: null}
        return response.json(status)

    } catch (error) {
        console.error(error)
        return response.json({status: 500, data: null, message: error.message})
    }
}

export async function getRsvpByRsvpMeetupIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = RsvpSchema.pick({rsvpMeetupId: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {rsvpMeetupId} = validationResult.data

        const data = await selectRsvpsByRsvpProfileId(rsvpMeetupId)

        const status: Status = {status: 200, data, message: null}
        return response.json(status)

    } catch (error) {
        console.error(error)
        return response.json({status: 500, data: null, message: error.message})
    }
}