'use server'

import {Status} from "@/utils/interfaces/Status";
import {Message, MessageSchema} from "@/utils/models/message/message.model";
import {setHeaders} from "@/utils/set-headers.utils";


export async function postMessage(message: Message) : Promise<Status> {
    return fetch (
        `${process.env.PUBLIC_API_URL}/apis/messages/`,
        {
            method: 'post',
            headers: await setHeaders(),
            body: JSON.stringify(message)
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response failed')
        }
        return response.json()
    }).catch(error => {
        console.error(error)
        throw error
    })
}

export async function fetchAllMessages() : Promise<Message[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/messages/`,
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
        if (!response.ok) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return MessageSchema.array().parse(data)
}

export async function fetchMessagebyMessageId(messageId: string) : Promise<Message> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/messages/messageId/${messageId}`,
        {
            method: 'get',
            headers: {
                'Content-type' : 'application/json'
            }
        }) .then(response => {
        if( !response.ok ) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return MessageSchema.parse(data)
}

export async function fetchMessagesByMessageMeetupId(messageMeetupId: string) : Promise<Message[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/messages/messageMeetupId/${messageMeetupId}`,
        {
            method: 'get',
            headers: {
                'Content-type' : 'application/json'
            }
        }) .then(response => {
        if( !response.ok ) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return MessageSchema.array().parse(data)
}

export async function fetchMessagesByMessageProfileId(messageProfileId: string) : Promise<Message[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/messages/messageProfileId/${messageProfileId}`,
        {
            method: 'get',
            headers: {
                'Content-type' : 'application/json'
            }
        }) .then(response => {
        if( !response.ok ) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return MessageSchema.array().parse(data)
}