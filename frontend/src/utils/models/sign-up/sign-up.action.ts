'use server'

import { Status } from "@/utils/interfaces/Status";
import { SignUp } from "./sign-up.model";
import {cookies} from "next/headers";


export async function postSignUp(signUp: SignUp): Promise<Status> {
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-up/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUp)
    })
    // no need to grab authorization header.
    // get the setCookie header from the response
    const serverCookies = response.headers.getSetCookie()

    //gain access to Next's internal cookie storage/modification object
    const cookieJar = await cookies()

    // helper function to handle parsing the cookie to convert it to an object
    const parseCookie = (str: string): Record<string, string> =>
        str.split(';') // Split the string into individual cookie parts
            .map(cookie => cookie.split('=')) // Split each part into key and value
            .filter(pair => pair.length === 2) // Ensure only valid key-value pairs are processed
            .reduce((acc: Record<string, string>, [key, value]) => {
                acc[decodeURIComponent(key.trim())] = decodeURIComponent(value.trim());
                return acc;
            }, {});

    //since Express and Next only share a single cookie between we can assume if a cookie exists it is the session cookie
    if(serverCookies[0]) {
        const sessionCookie = parseCookie(serverCookies[0])
        cookieJar.set('connect.sid', sessionCookie['connect.sid'], {path: sessionCookie.path, sameSite: 'lax', httpOnly:true})
    }

    return response.json().then((response) => {

        return response
    }).catch((error) => {
        console.error(error)
        throw error
    })
}