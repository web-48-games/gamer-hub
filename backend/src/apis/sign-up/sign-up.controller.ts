import {serverErrorResponse, zodErrorResponse} from "../../utils/response.utils";
import {Request, Response} from "express";
import {SignUpSchema} from "./sign-up.validator";
import Mailgun from "mailgun.js";
import formData from "form-data"
import {setActivationToken, setHash} from "../../utils/auth.utils";
import {insertProfile, PrivateProfile} from "../profile/profile.model";

export async function signUpController(request: Request, response: Response) {
    try {
        const validationResult = SignUpSchema.safeParse(request.body)
        if ( !validationResult.success ) {
            return zodErrorResponse(response, validationResult.error)
        }

        const mailgun= new Mailgun(formData)
        const mailgunClient=mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY as string,
        })
        const {profileEmail, profileName, profilePassword, profilePasswordConfirm, profileId} = validationResult.data
        const profileHash = await setHash(profilePassword)
        const profileActivationToken = setActivationToken()
        const profileAvatarUrl = 'http://placekitten.com/300/300'
        const basepath = `${request.protocol}://${request.hostname}:8080${request.originalUrl}activation/${profileActivationToken}`
        const html = `<h1>Welcome to A Game Away</h1>
        <p>In order to start finding games please verify your account<a href="${basepath}">${basepath}</a></p>>`
        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: profileEmail,
            subject: `Welcome to A Game Away`,
            html
        }
        const profile : PrivateProfile = {
            profileId: profileId,
            profileAboutMe: null,
            profileActivationToken,
            profileEmail,
            profileName,
            profileHash,
            profileCreationDate:null,
            profileAvatarUrl
        }
        const message = await insertProfile(profile)

        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

        return response.json({data: null, message, status:200})

    } catch (error) {
        console.error(error)
        return serverErrorResponse(response)
    }

}