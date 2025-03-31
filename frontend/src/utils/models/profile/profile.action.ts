'use server'

import { Profile, ProfileSchema } from '@/utils/models/profile/profile.model'
import {setHeaders} from "@/utils/set-headers.utils";

export async function fetchProfileByProfileId(profileId: string) : Promise<Profile> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profiles/id/${profileId}`,
        {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }) .then(response => {
        if( !response.ok) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return ProfileSchema.parse(data)
}

//put profile function submits profile to backend
export async function putProfile(profile: Profile) {
    return fetch (
        `${process.env.PUBLIC_API_URL}/apis/profiles/id/${profile.profileId}`,
        {
            method: 'put',
            headers: await setHeaders(),
            body: JSON.stringify(profile)
        }
    ) .then(response => {
        if( !response.ok) {
            throw new Error('request failed')
        }
        return response.json()
    }).catch(error => {
        console.error(error)
        throw error
    })
}


