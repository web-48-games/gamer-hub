'use server'

import { Status } from '@/utils/interfaces/Status'
import { Favorite, FavoriteSchema } from '@/utils/models/favorite/favorite.model'
import {setHeaders} from "@/utils/set-headers.utils";

export async function postFavorite(favorite: Favorite) : Promise<Status> {
    console.log(favorite)
    return fetch(
        `${process.env.PUBLIC_API_URL}/apis/favorites/`,
        {
            method: 'post',
            headers: await setHeaders(),
            body: JSON.stringify(favorite)
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response failed')
        }
        return response.json()
    }). catch(error => {
        console.error(error)
        throw error
    })
}

export async function fetchFavoritesByFavoriteProfileId(favoriteProfileId: string) : Promise<Favorite[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/favorites/profile-id/${favoriteProfileId}`,
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
    return FavoriteSchema.array().parse(data)
}

export async function fetchFavoritesByFavoriteGameId(favoriteGameId: string) : Promise<Favorite[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/favorites/game-id/${favoriteGameId}`,
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
    return FavoriteSchema.array().parse(data)
}

export async function toggleFavorite(favorite: Favorite)  {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/favorites/toggle`,
        {
            method: 'post',
            headers: await setHeaders(),
            body: JSON.stringify(favorite)
        }).then(response => {
        if (!response.ok) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return FavoriteSchema.array().parse(data)
}