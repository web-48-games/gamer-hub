import {MeetUpSchema} from "./meet-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {insertMeetup} from "./meet-up.model";
import {Request, Response} from "express";
import
// meet-up adding social functions

//
export async function postMeetupController(request: Request, response: Response):Promise<Response> {
    try {
        //validation request with meetup schema
        const validationResult = MeetUpSchema.safeParse(request.body);

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLng, meetupStartTime} = validationResult.data

        const meetup = {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLng, meetupStartTime}

        const uploadMeetup = await insertMeetup(meetup)

        return response.json({status:200, message: uploadMeetup, data: null})


    }catch(error){
        console.error(error);
        return response.json({ status: 500, data: null, message: error.message })

    }
}
export async function deleteMeetupByMeetupHostProfileIdController (request: Request, response: Response): Promise<Response> {
    try {

        const validationResult = z.string().uuid({message: 'please provide a valid meetupId'}).safeParse(request.params.meetupId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const profile: PublicProfile = request.session.profile as PublicProfile


        const meetupHostProfileId: string = profile.profileId as string


        const meetupId = validationResult.data


        const meetup = await selectMeetupByMeetupId(meetupId)

        if(meetup?.meetupProfileId !== meetupProfileId) {
            return response.json({
                status: 403,
                message: 'you are not allowed to delete this this meetup',
                data: null
            })
        }

        const result = await deleteMeetupByMeetupId(meetupId)

        return response.json({status: 200, message: result, data: null})


    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}


