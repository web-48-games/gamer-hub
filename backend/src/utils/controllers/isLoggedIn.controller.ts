import {NextFunction, Request, Response} from 'express'
import {Status} from "../interfaces/Status";
import {PublicProfile} from "../../apis/profile/profile.model";
import {verify} from "jsonwebtoken";

export function isLoggedInController(request: Request, response: Response, next: NextFunction) {
    const status: Status = {
        status: 401,
        message: 'You are not logged in. Please Login.',
        data: null
    }
    try {
        // assign profile from session
        const profile: PublicProfile | undefined = request.session?.profile

        // assign signature from session
        const signature: string | undefined = request.session?.signature

        // assign unparsed jwt token off request header
        const unverifiedJwtToken: string | undefined = request.headers?.authorization

        // if the profile, signature, or jwt token are undefined, let user know they're not logged in
        if (profile === undefined || signature === undefined || unverifiedJwtToken === undefined) {
            return response.json(status)
        }

        // verify jwt token from request header matches JWT token from session. if the tokens do not match, let user know they're not logged in
        if (unverifiedJwtToken !== request.session?.jwt) {
            return response.json(status)
        }

        // verify that jwt token from request is valid
        verify(unverifiedJwtToken, signature)

        // if jwt token is veified without throwing an error, call the next controller
        return next()

    } catch(error) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}