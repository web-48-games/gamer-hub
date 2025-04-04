'use server'

import { SignIn } from './sign-in.model'
import { cookies } from 'next/headers'
import { Status } from '@/utils/interfaces/Status'

export async function postSignIn(signIn: SignIn): Promise<Status> {
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signIn)
    })

    // grab the authorization header from the response
    const authorization = response.headers.get('authorization')

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

    // if authorization header exists set it to a cookie for use on the frontend to pass in future requests
    if (authorization) {
        cookieJar.set('earl-grey', authorization, {path: '/', sameSite: 'strict', httpOnly: true, maxAge:10_800})
    }



    return response.json().then((response) => {
    console.log(response)
        return response
    }).catch((error) => {
        console.error(error)
        throw error
    })

}