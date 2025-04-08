'use server'


import { getSession } from "@/utils/auth.utils"
import { headers as incomingHeaders } from "next/dist/server/request/headers"
import {Status} from "@/utils/interfaces/Status";
//can't resolve image?

//creating postImageFunction
export async function postImage(image: FormData): Promise<Status> {
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
    return fetch(`${process.env.PUBLIC_API_URL}/apis/image`, {
        headers,
        //import apis/image let this work, import not resolved
        body: image,
        method: "post"
    }).then(response => {
        if(!response.ok){
            throw new Error('Network response failed')
        }
        return response.json()
    })
}