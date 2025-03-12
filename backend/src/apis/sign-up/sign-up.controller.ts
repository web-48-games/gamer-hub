import {serverErrorResponse, zodErrorResponse} from "../../utils/response.utils";
import {Request, Response} from "express";
import {SignUpSchema} from "./sign-up.validator";

export async function signUpController(request: Request, response: Response) {
    try {
        const validationResult = SignUpSchema.safeParse(request.body)
        if ( !validationResult.success ) {
            return zodErrorResponse(response, validationResult.error)
        }
    } catch (error) {
        console.error(error)
        return serverErrorResponse(response)
    }

}