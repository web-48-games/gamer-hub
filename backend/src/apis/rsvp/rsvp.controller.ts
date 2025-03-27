import {RsvpSchema} from "./rsvp.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {Request, Response} from "express";
import {Status} from "../../utils/interfaces/Status";
import {
    deleteRsvp,
    insertRsvp,
    Rsvp, selectRsvpByRsvpId,
    selectRsvpsByRsvpMeetupId,
    selectRsvpsByRsvpProfileId
} from "./rsvp.model";
import {PublicProfile} from "../profile/profile.model";
import {deleteMeetupByMeetupId} from "../meet-up/meet-up.model";
import {Favorite} from "../favorite/favorite.validator";


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

        const data = await selectRsvpsByRsvpMeetupId(rsvpMeetupId)

        const status: Status = {status: 200, data, message: null}
        return response.json(status)

    } catch (error) {
        console.error(error)
        return response.json({status: 500, data: null, message: error.message})
    }
}

export async function deleteRsvpController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = RsvpSchema.pick({rsvpMeetupId: true}).safeParse(request.params)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {rsvpMeetupId} = validationResult.data
        const profile: PublicProfile = request.session.profile as PublicProfile
        const rsvpProfileId: string = profile.profileId as string

        const findRsvp: Rsvp = {
            rsvpMeetupId,
            rsvpProfileId,
            rsvpAt: null
        }

        const rsvp: Rsvp | null = await selectRsvpByRsvpId(findRsvp)
        if (rsvp?.rsvpProfileId !== rsvpProfileId) {
            return response.json ({
                status: 403,
                message: 'You are not allowed to delete this rsvp',
                data: null
            })
        }


        const result = await deleteRsvp(rsvp)
        return response.json({status: 200, message: result, data: null})

    } catch(error) {
        console.error(error)
        return response.json({status: 500, data: null, message: error.message})
    }

}