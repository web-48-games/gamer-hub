'use server'

import {Rsvp, RsvpSchema} from "@/utils/models/rsvp/rsvp.model";
import {setHeaders} from "@/utils/set-headers.utils";
import {Status} from "@/utils/interfaces/Status";
import {MeetUpSchema} from "@/utils/models/meetups/meetup.model";

export async function postRsvp(rsvp: Rsvp): Promise<Status> {
    return fetch(`${process.env.PUBLIC_API_URL}/apis/rsvp/`,
    {
        method: 'post',
        headers: await setHeaders(),
        body: JSON.stringify(rsvp)
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


export async function fetchRsvpByRsvpProfileId(rsvpProfileId: string) : Promise<Rsvp[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/rsvp/profileId/${rsvpProfileId}`,
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
    return RsvpSchema.array().parse(data)
}


export async function fetchRsvpByRsvpMeetupId(rsvpMeetupId: string) : Promise<Rsvp[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/rsvp/meetupId/${rsvpMeetupId}`,
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
    return RsvpSchema.array().parse(data)
}

export async function deleteRsvp(rsvpMeetupId: string) : Promise<Status> {
    return fetch(`${process.env.PUBLIC_API_URL}/apis/meetupId/${rsvpMeetupId}`,
        {
            method: 'delete',
            headers: await setHeaders()
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