import {GameSchema} from "./game.validator";
import {Request, Response} from "express";
import {zodErrorResponse} from "../../utils/response.utils";
import {selectGameByGameId, selectGamesByGenre} from "./game.model";
import {z} from "zod";


export async function getGameByGameIdController(request: Request, response: Response) {
    try {
        // validate request with game schema
        const validationResult = GameSchema.pick({gameId: true}).safeParse(request.body)

        // if validation is not successful, tell the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {gameId} = validationResult.data

        const game = await selectGameByGameId(gameId)

        return response.json({ status: 200, message: null, data: game })

    } catch(error) {
        console.error(error)
        return 'game not found'
    }
}

export async function getGamesByGenre(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string({message: 'please provide valid gameGenre'}).safeParse(request.params.gameGenre)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // define based on what we decide how the filtering will work
        const gameGenres = validationResult.data

        const gamesData = await selectGamesByGenre(gameGenres)

        return response.json({ status: 200, message: null, data: gamesData })

    } catch(error) {
        console.error(error)
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}

// com back to finish
export async function getFeaturedGamesController(request: Request, response: Response): Promise<Response> {
    try {
        // just an arbitrary value, maybe comeback and change to something else
        let cap:number = 5
        const featuredGames = await selectFeaturedGames(cap)
        return response.json({
            status: 200,
            data: featuredGames,
            message: 'Featured Games found successfully'
        })
    } catch(error) {
        console.error(error)
        return response.json({
            status: 500,
            data: null,
            message: error.message
        })
    }
}

// export async function incrementGameLikes() {
//     try {
//
//     } catch(error) {
//         console.error(error)
//     }
// }