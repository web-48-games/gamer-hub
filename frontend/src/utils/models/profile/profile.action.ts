'use server'

import { Profile, ProfileSchema } from '@/utils/models/profile/profile.model'

export async function fetchProfileByProfileId(profileId: string) : Promise<Profile> {
    console.log(profileId, "line 6 of profile action for fetchProfileByProfileId")
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profiles/id/${profileId}`,
        {
            method: 'get',
            headers: {
                // 'Content-type': 'application/json'
            }
        }) .then(response => {
        if( !response.ok) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return ProfileSchema.parse(data)
}