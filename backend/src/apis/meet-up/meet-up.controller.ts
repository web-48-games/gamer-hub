import {MeetUpSchema} from "./meet-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    deleteMeetupByMeetupId,
    insertMeetup,
    Meetup, selectCurrentMeetups,
    selectMeetupByMeetupId, selectMeetupsByCapacity, selectMeetupsByGame, selectMeetupsByGenre,
    selectMeetupsByRsvpProfileId
} from "./meet-up.model";
import {Request, Response} from "express";
import {PublicProfile} from "../profile/profile.model";
import {z, ZodObject} from "zod";
import {FavoriteSchema} from "../favorite/favorite.validator";
import {RsvpSchema} from "../rsvp/rsvp.validator";
import {GameSchema} from "../game/game.validator";
import {insertRsvp} from "../rsvp/rsvp.model";


export async function postMeetupController(request: Request, response: Response):Promise<Response> {
    try {
        //validation request with meetup schema
        const validationResult = MeetUpSchema.safeParse(request.body);

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCapacity, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupName, meetupStartTime} = validationResult.data

        const meetup = {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCapacity, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupName, meetupStartTime}

        const uploadMeetup = await insertMeetup(meetup)
        const rsvp = {rsvpMeetupId : meetupId, rsvpProfileId: meetupHostProfileId, rsvpAt: null}
        await insertRsvp(rsvp)

        return response.json({status:200, message: uploadMeetup, data: null})


    }catch(error: any){
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


    } catch (error:any) {
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


    catch(error: any){
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

    } catch(error: any){
        console.error(error);
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

// working as intended, tested
export async function getCurrentMeetups(request: Request, response: Response): Promise<Response> {
    try {
        const currentMeetups = await selectCurrentMeetups()
        return response.json({
            status: 200,
            message: 'current meetups retrieved',
            data: currentMeetups
        })
    } catch(error: any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

// tested.
export async function getMeetupsByGame(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = MeetUpSchema.pick({meetupGameId: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {meetupGameId} = validationResult.data
        const meetups = await selectMeetupsByGame(meetupGameId)

        return response.json({
            status: 200,
            message: 'meetups from gameId retrieved',
            data: meetups
        })
    } catch(error: any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

//tested.
export async function getMeetupsByCapacity(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = MeetUpSchema.pick({meetupCapacity: true}).safeParse(request.params)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {meetupCapacity} = validationResult.data
        console.log(meetupCapacity)
        const meetups = await selectMeetupsByCapacity(meetupCapacity)

        return response.json({
            status: 200,
            message: 'meetups based on capacity retrieved',
            data: meetups
        })

    } catch(error: any) {
        console.error(error);
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

//tested.
export async function getMeetupsByGenre(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string({message: 'please provide valid gameGenre'}).min(1, {message: 'Game genre must be at least one character.'}).max(64, {message: 'Game genre cannot exceed 64 characters.'}).safeParse(request.params.gameGenre)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const gameGenre = validationResult.data
        const meetups = await selectMeetupsByGenre(gameGenre)

        return response.json({
            status: 200,
            message: 'meetups based on genre retrieved',
            data: meetups
        })

    } catch(error: any) {
        console.error(error);
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}