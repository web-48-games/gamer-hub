import {MeetUpSchema} from "./meet-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    deleteMeetupByMeetupId,
    insertMeetup,
    Meetup,
    selectMeetupByMeetupId,
    selectMeetupsByRsvpProfileId
} from "./meet-up.model";
import {Request, Response} from "express";
import {PublicProfile} from "../profile/profile.model";
import {z} from "zod";
import {FavoriteSchema} from "../favorite/favorite.validator";
import {RsvpSchema} from "../rsvp/rsvp.validator";
// meet-up adding social functions
//meetup by category,
//
export async function postMeetupController(request: Request, response: Response):Promise<Response> {
    try {
        //validation request with meetup schema
        const validationResult = MeetUpSchema.safeParse(request.body);

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupStartTime} = validationResult.data

        const meetup = {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupStartTime}

        const uploadMeetup = await insertMeetup(meetup)

        return response.json({status:200, message: uploadMeetup, data: null})


    }catch(error){
        console.error(error);
        return response.json({ status: 500, data: null, message: error.message })

    }
}
export async function deleteMeetupByMeetupIdController(request: Request, response: Response): Promise<Response> {
    try {
        // validating incoming request via host profile id with uuid schema
        const validationResult = z.string().uuid({message: 'please provide a valid meetupId'}).safeParse(request.params.meetupId)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        // pulling profile from session
        const profile: PublicProfile = request.session.profile as PublicProfile
        // set host profile id as profile id from session
        const hostProfileId: string = profile.profileId as string
        // get meetupId from request params
        const meetupId = validationResult.data

        const meetup = await selectMeetupByMeetupId(meetupId)

        if(meetup?.meetupHostProfileId !== hostProfileId) {
            return response.json({
                status: 403,
                message: 'you are not allowed to delete this this meetup',
                data: null
            })
        }

        const result = await deleteMeetupByMeetupId(meetupId)
        return response.json({status: 200, message: result, data: null})


    } catch (error) {
        console.error(error);
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}
export async function getMeetupByMeetupIdController(request: Request, response: Response): Promise<Response> {

    try {

        const validationResult = z.string().uuid({message: 'please provide a valid meetupId'}).safeParse(request.params.meetupId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)

        }

        const meetupId = validationResult.data

        const meetup: Meetup | null = await selectMeetupByMeetupId(meetupId)

        return response.json({status: 200, message: null, data: meetup})

    }


    catch(error){
        console.error(error);
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

// get all meetups associated with a profile
export async function getMeetupsByRsvpProfileId(request: Request, response: Response): Promise<Response> {
    try {
        // validate request
        const validationResult = RsvpSchema.pick({rsvpProfileId: true}).safeParse(request.params)

        // if validation is not successful, tell the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {rsvpProfileId} = validationResult.data
        const meetups = await selectMeetupsByRsvpProfileId(rsvpProfileId)

        return response.json({
            status: 200,
            message: 'meetups retrieved',
            data: meetups
        })

    } catch(error){
        console.error(error);
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

