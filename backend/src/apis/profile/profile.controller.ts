import {PublicProfileSchema} from "./profile.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {Request, Response} from "express";
import {PrivateProfile, selectPublicProfileByProfileId, selectPublicProfileByProfileName} from "./profile.model";


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
        return response.json({status: 500, message: error.message, data: null})
    }
}

export async function getPublicProfileByProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = PublicProfileSchema.pick({profileId: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {profileId} = validationResult.data

        const data = await selectPublicProfileByProfileId(profileId)

        return response.json({status: 200, message: null, data})

    } catch(error) {
        console.error(error)
        return response.json({status: 500, message: error.message, data: null})
    }
}

export async function putProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = PublicProfileSchema.safeParse(request.body)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // validate profileId from request params
        const validationResultParams = PublicProfileSchema.pick({profileId: true}).safeParse(request.params)

        if (!validationResultParams.success) {
            return zodErrorResponse(response, validationResultParams.error)
        }

        // get profileId of this session
        const profileFromSession = request.session?.profile
        const profileIdFromSession = profileFromSession?.profileId

        const {profileId} = validationResultParams.data

        if (profileIdFromSession !== profileId) {
            return response.json({status: 400, message: "you cannot update a profile that is not yours", data: null})
        }

        // grab other profile data off the initial validated result
        const {profileAboutMe, profileAvatarUrl, profileCreationDate, profileName} = validationResult.data

        // grab the whole profile by id
        const profile: PrivateProfile|null = await selectPrivateProfileByProfileId(profileId)

        if(!profile) {
            return response.json({status: 400, message: "profile does not exist", data: null})
        }

        //update the profile with new data
        profile.profileAboutMe = profileAboutMe
        profile.profileAvatarUrl = profileAvatarUrl
        profile.profileCreationDate = profileCreationDate
        profile.profileName = profileName

        //update profile with new data above into the database
        await updateProfile(profile)

        return response.json({status: 200, message: "profile successfully updated", data: null})

    } catch(error) {
        console.error(error)
        return response.json({status: 500, message: error.message, data: null})
    }
}