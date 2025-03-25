'use server'
import {headers as incomingHeaders} from 'next/headers'
import {getSession} from "@/utils/auth.utils";

export async function setHeaders() {
    // create a new Headers object
    const headers = new Headers()

    //grab the current session
    const session = await getSession()

    // harvest the authorization token from the session
    const authorization = session?.authorization

    // if the authorization token exists, append it to the headers
    if(authorization) {
        headers.append("authorization", authorization)
    }

    // append the content type to the headers
    headers.append('Content-Type', 'application/json')
    const incomingHeadersObject = await incomingHeaders()

    // grab the cookie from the incoming headers
    const cookie = incomingHeadersObject.get('cookie')

    // if the cookie exists, append it to the headers
    if (cookie){
        headers.append('cookie', cookie)
    }

    // return the headers
    return headers
}