import {GameSchema} from "./game.validator";
import {Request, Response} from "express";
import {zodErrorResponse} from "../../utils/response.utils";
import {selectGameByGameId} from "./game.model";


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

export async function getGamesController(request: Request, response: Response): Promise<Response> {
    try {
        // change schema to a 'GameFilterSchema' after defining it in validator
        const validationResult = GameSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // define based on what we decide how the filtering will work
        const {} = validationResult.data

        const games = await selectGames()

        return response.json({ status: 200, message: null, data: games })

    } catch(error) {
        console.error(error)
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}

export async function getFeaturedGames() {}