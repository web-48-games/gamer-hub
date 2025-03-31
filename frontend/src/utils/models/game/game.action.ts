'use server'

import { Game, GameSchema } from '@/utils/models/game/game.model'

export async function fetchGameByGameId(gameId: string) : Promise<Game | null> {
     const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/gameId/${gameId}`,
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
    return GameSchema.nullable().parse(data)
}

export async function fetchGameByGameName(gameName: string) : Promise<Game> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/gameName/${gameName}`,
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
    return GameSchema.parse(data)
}

export async function fetchGamesByGenre(gameGenre: string) : Promise<Game[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/genre/${gameGenre}`,
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
    return GameSchema.array().parse(data)
}

export async function fetchGamesByGenres(gameGenres: string[]) : Promise<Game[]> {
    let queryString = ''
    gameGenres.forEach((genre, i) => queryString += (i === 0 ? '?' : '&') + i + '=' + genre)
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/genres${queryString}`,
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
    return GameSchema.array().parse(data)
}

export async function fetchGamesByYearPublished(gameYearPublished: string) : Promise<Game[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/year/${gameYearPublished}`,
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
    return GameSchema.array().parse(data)
}

export async function fetchFeaturedGames() : Promise<Game[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/featured/`,
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
    return GameSchema.array().parse(data)
}

export async function fetchGamesByFavoriteProfileId(favoriteProfileId: string) : Promise<Game[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/favorites/${favoriteProfileId}`,
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
    return GameSchema.array().parse(data)
}

export async function fetchAllGenres() : Promise<[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/games/allGenres`,
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
    return data
}
