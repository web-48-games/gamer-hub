import {MeetUpSchema} from "./meet-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {deleteMeetupByMeetupId, insertMeetup, selectMeetupByMeetupId} from "./meet-up.model";
import {Request, Response} from "express";
import {PublicProfile} from "../profile/profile.model";
import {z} from "zod";
// meet-up adding social functions

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
        console.log(meetupId)
        const meetup = await selectMeetupByMeetupId(meetupId)

        if(meetup?.meetupHostProfileId !== hostProfileId) {
            return response.json({
                status: 403,
                message: 'you are not allowed to delete this this meetup',
                data: null
            })
        }

        const result = await deleteMeetupByMeetupId(meetupId)
        console.log(result)
        return response.json({status: 200, message: result, data: null})


    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}


