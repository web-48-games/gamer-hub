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
import {PrivateProfile, selectPrivateProfileByProfileActivationToken} from "../profile/profile.model";


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

    } catch(error) {
        console.error(error)
        return response.json({ status: 500, data: null, message: error.message})
    }
}