import {GameSchema} from "./game.validator";
import {Request, Response} from "express";
import {zodErrorResponse} from "../../utils/response.utils";


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

        return response.json()
    } catch(error) {
        console.error(error)
        return 'game not found'
    }
}