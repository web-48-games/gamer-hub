import {Request, Response} from 'express';
import {activationSchema} from "./activation.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {selectPrivateProfileByProfileActivationToken, updateProfile} from "../profile/profile.model";

export async function activationController (request: Request, response: Response) {
    try {
        const validationResult = activationSchema.safeParse(request.params)
        if(!validationResult.success){
            return zodErrorResponse(response,validationResult.error)
        }
        const {activation} = validationResult.data
        const profile = await selectPrivateProfileByProfileActivationToken(activation)
        if(!profile){
            return response.json({status: 400, data: null, message: "Account Activation has failed, have you already activated this account?"})
        }
        profile.profileActivationToken = null
        await updateProfile(profile)
        return response.json({status: 200, data: null, message: "Account successfully activated"})
    }
    catch (error) {
        console.error(error)
        return response.json({status: 500, data: null, message: 'Internal server error'})
    }
}