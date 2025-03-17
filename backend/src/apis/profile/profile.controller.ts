import {PublicProfileSchema} from "./profile.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {Request, Response} from "express";
import {selectPublicProfileByProfileName} from "./profile.model";


export async function getPublicProfileByProfileNameController(request: Request, response: Response): Promise<Response> {
    try {

        // validate the profileName coming from the request parameters
        const validationResult = PublicProfileSchema.pick({profileName: true}).safeParse(request.params)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // grab the profileName off of the validated request parameters
        const {profileName} = validationResult.data

        // grab the profile by profileName
        const data= await selectPublicProfileByProfileName(profileName)

        // return the response to the client with the requested information
        return response.json({status: 200, message: null, data})

    } catch (error: unknown) {
        console.error(error)
        // if an error occurs, return a preformatted response to the client
        return response.json({status: 500, message: "internal server error", data: null})
    }
}