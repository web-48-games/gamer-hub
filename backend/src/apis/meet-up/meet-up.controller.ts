import {MeetUpSchema} from "./meet-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {insertMeetup} from "./meet-up.model";
import {Request, Response} from "express";
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

