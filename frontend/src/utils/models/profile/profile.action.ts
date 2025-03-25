'use server'

import { Profile, ProfileSchema } from '@/utils/models/profile/profile.model'

export async function fetchProfileByProfileId(profileId: string) : Promise<Profile> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profile/${profileId}`,
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