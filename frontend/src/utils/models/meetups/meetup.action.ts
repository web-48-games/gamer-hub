'use server'

import { Status } from '@/utils/interfaces/Status'
import {Meetup, MeetUpSchema, PostMeetup} from "@/utils/models/meetups/meetup.model";
import {setHeaders} from "@/utils/set-headers.utils";

export async function postMeetup (meetup: PostMeetup) : Promise<Status> {

    return fetch (
        `${process.env.PUBLIC_API_URL}/apis/meetups/`,
        {
            method: 'post',
            headers: await setHeaders(),
            body: JSON.stringify(meetup)
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

export async function fetchMeetupByMeetupId(meetupId: string) : Promise<Meetup> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/meetups/${meetupId}`,
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
    return MeetUpSchema.parse(data)
}

// from getMeetupsByGame
export async function fetchMeetupsByGame(meetupGameId: string) : Promise<Meetup[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/meetups/meetupGameId/${meetupGameId}`,
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
    return MeetUpSchema.array().parse(data)
}

export async function fetchMeetupsByRsvpProfileId(rsvpProfileId: string) : Promise<Meetup[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/meetups/profileId/${rsvpProfileId}`,
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
    return MeetUpSchema.array().parse(data)
}


export async function fetchCurrentMeetups() : Promise<Meetup[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/meetups/`,
        {
            method: 'get',
            headers: {
                'Content-type' : 'application/json'
            }
        }) .then(response => {
        if( !response.ok ) {
            throw new Error('request failed')
        }
        console.log('API URL:', process.env.PUBLIC_API_URL)
        return response.json()
    })
    return MeetUpSchema.array().parse(data)
}