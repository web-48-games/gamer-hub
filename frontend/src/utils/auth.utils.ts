"use server"

import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";
import {Profile, ProfileSchema} from "@/utils/models/profile/profile.model";

export type Session = {
    profile: Profile,
    authorization: string
    exp: number
}

const currentTimeInSeconds = new Date().getTime() / 1000

/**
 * grabs the current session from the earl-grey cookie if it exists
 * @returns {Promise<Session | undefined>} the session if it exists
 * @throws {Error} if the jwt token is invalid
 */

export async function getSession(): Promise<Session|undefined > {
    // gain access to the cookies
    const cookieStore = await cookies()
    // grab the jwt token
    const jwtToken = cookieStore.get("earl-grey")

    // if the jwt token exists, parse it and return the decoded session
    if ( jwtToken) {
        return  setJwtToken(jwtToken.value)

    } else {
        return undefined
    }

}

// clears the session by deleting the earl-grey and connect.sid cookies
export async function clearSession() {
    const cookieStore =  await cookies()
    cookieStore.delete("earl-grey")
    cookieStore.delete("connect.sid")
}


/**
 * sets the jwt token and returns the session
 * @param {string} jwtToken the jwt token
 * @returns {Promise<Session | undefined>} the session if it exists
 * @throws {Error} if the jwt token is invalid
 */

async  function setJwtToken(jwtToken: string):Promise<Session | undefined> {
    try {

        // decode the jwt token
        const  parsedJwtToken = jwtDecode(jwtToken) as any

        // if the JWT token is valid and has not expired, return the session
        if(parsedJwtToken &&  currentTimeInSeconds < parsedJwtToken.exp) {
            return  {
                profile: ProfileSchema.parse(parsedJwtToken.auth),
                authorization: jwtToken,
                exp: parsedJwtToken.exp
            }
        } else {
            return undefined
        }


    } catch (error) {
        console.error(error)
        throw new Error('Invalid jwt token')
    }
}