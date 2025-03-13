/**
 * Express controller for sign-in
 * @endpoint POST /apis/sign-in/
 * @param request an object containing the body contain a profileEmail and profilePassword.
 * @param response an object modeling the response that will be sent to the client.
 * @returns response to the client indicating whether the sign in was successful or not
 * @throws {Error} an error indicating what went wrong
 */
import {signInProfileSchema} from "./sign-in.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    PrivateProfile,
    selectPrivateProfileByProfileEmail
} from "../profile/profile.model";
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import {Status} from "../../utils/interfaces/Status";
import { v7 as uuid } from "uuid";
import {Request, Response} from "express";


export async function signInController (request: Request, response: Response): Promise<Response> {
    try {
        // validate incoming profile from request body
        const validationResult = signInProfileSchema.safeParse(request.body)

        // if validation fails, return zod error
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // deconstruction to have access to these fields
        const { profileEmail, profilePassword} = validationResult.data

        // select profile by profileEmail from the database
        const profile: PrivateProfile | null = await selectPrivateProfileByProfileEmail(profileEmail);

        // create a preformatted response to send to client if the sign in fails
        const signInFailedStatus: Status = {
            status: 400,
            message: 'Email or password is incorrect, please try again',
            data: null
        }

        // if there is no profile, display the failed Status
        if (profile === null) {
            return response.json(signInFailedStatus)
        }

        // check if the password matches hash
        const isPasswordValid = await validatePassword(profile.profileHash, profilePassword)
        // check for sign in success/failure
        // return the failed Status if it fails
        if (!isPasswordValid) {
            return response.json(signInFailedStatus)
        }

        // deconstruct profile attributes for access
        const { profileId, profileAboutMe, profileAvatarUrl, profileName, profileCreationDate} = profile

        // if sign-in succeeds, create new session for client and return response to client
        const signature: string = uuid()

        // generate a new json web token for the session using the profile attributes and signature
        const authorization: string = generateJwt({
            profileId,
            profileAboutMe,
            profileAvatarUrl,
            profileName,
            profileCreationDate
        }, signature)

        // set session variables
        request.session.profile = profile
        request.session.jwt = authorization
        request.session.signature = signature

        // set the authorization header
        response.header({
            authorization
        })

        // return successful response to client
        return response.json({ status: 200, message: 'Sign in was successful', data: null })

    } catch(error) {
        console.error(error)
        return response.json({ status: 500, data: null, message: error.message})
    }
}