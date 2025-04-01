'use server'

import { Status } from "@/app/interfaces/Status"
import { getSession } from "@/utils/auth.utils"
import { headers as incomingHeaders } from "next/dist/server/request/headers"

//creating postImageFunction
export default function postImage(): Promise<Status> {
    //headers for authorization, correct profile for uploading image
    const headers = new Headers()

    const session = await getSession()

    const authorization = session?.authorization
    if (authorization) {
        headers.append("authorization", authorization)
    }

    const incomingHeadersObject = await incomingHeaders()

    const cookie = incomingHeadersObject.get('cookie')
    if (cookie){
        headers.append('cookie', cookie)
    }
    return fetch(`${process.env["REST_API_URL"]}/apis/image`, {
        headers,
        //referencing apis/image?
        body: image,
        method: "post"
    }).then(response => {
        if(!response.ok){
            throw new Error('Network response failed')
        }
        return response.json()
    })
}