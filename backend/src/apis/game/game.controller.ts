import {GameSchema} from "./game.validator";
import {Request, Response} from "express";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    Game, insertGame, selectFavoriteGames,
    selectFeaturedGames,
    selectGameByGameId,
    selectGameByGameName,
    selectGamesByGameYearPublished,
    selectGamesByGenre
} from "./game.model";
import {z} from "zod";
import {FavoriteSchema} from "../favorite/favorite.validator";

// might not be in practical use b/c game will be external data but useful for testing
export async function postGamesController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = GameSchema.safeParse(request.body)

        if (!validationResult.success ) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {gameId, gameDescription, gameGenre, gameImageUrl, gameMaxPlayers, gameName, gameYearPublished} = validationResult.data

        const game: Game =  {
            gameId,
            gameDescription,
            gameGenre,
            gameImageUrl,
            gameMaxPlayers,
            gameName,
            gameYearPublished,
        }

        const result = await insertGame(game)

        return response.json({
            status: 200,
            message: result,
            data: null
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

export async function getGameByGameIdController(request: Request, response: Response) {
    try {
        // validate request with game schema
        const validationResult = GameSchema.pick({gameId: true}).safeParse(request.params)

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


export async function getGameByGameNameController(request: Request, response: Response): Promise<Response> {
    try {
        // validate request with game schema
        const validationResult = GameSchema.pick({gameName: true}).safeParse(request.params)

        // if validation is not successful, tell the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {gameName} = validationResult.data

        const game = await selectGameByGameName(gameName)

        return response.json({ status: 200, message: null, data: game })

    } catch(error) {
        console.error(error)
        return response.json({
            status: 500,
            data: null,
            message: error.message
        })
    }
}

export async function getGamesByGenre(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string({message: 'please provide valid gameGenre'}).min(1, {message: 'Game genre must be at least one character.'}).max(64, {message: 'Game genre cannot exceed 64 characters.'}).safeParse(request.params.gameGenre)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // define based on what we decide how the filtering will work
        const gameGenres = validationResult.data

        const gamesData = await selectGamesByGenre(gameGenres)

        return response.json({ status: 200, message: 'Number of games found ' + gamesData.length, data: gamesData })

    } catch(error) {
        console.error(error)
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}

export async function getGamesByYearPublished(request: Request, response: Response): Promise<Response> {
    try {
        // gives safeparse an object instead of the string that is gameYearPublished
        const yearParam = request.params.gameYearPublished
        const validateThisData = { gameYearPublished: yearParam }
        const validationResult = GameSchema.pick({gameYearPublished: true}).safeParse(validateThisData)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        // extract validated Date then year for further validation below
        const date = validationResult.data.gameYearPublished
        const year = date.getFullYear()

        // year must be between oldest and newest games on boardgamegeek
        if (year < -3500 || year > 2025) {
            return response.json({
                status: 400,
                data: null,
                message: "Year must be between -3500 and 2025"
            });
        }

        // year is good to use for our model method
        const gamesData = await selectGamesByGameYearPublished(year)

        return response.json({ status: 200, message: null, data: gamesData})

    } catch(error) {
        console.error(error)
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}


// come back to finish
export async function getFeaturedGamesController(request: Request, response: Response): Promise<Response> {
    try {
        // cap is manually set here
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

export async function getGamesByFavoriteProfileId(request: Request, response: Response): Promise<Response> {

    try {
        // validate request
        const validationResult = FavoriteSchema.pick({favoriteProfileId: true}).safeParse(request.params)

        // if validation is not successful, tell the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // destructure to access data in request
        const {favoriteProfileId} = validationResult.data
        const favoriteGames = await selectFavoriteGames(favoriteProfileId)
        return response.json({
            status: 200,
            message: 'successfully selected favorite games for a profile',
            data: favoriteGames })

    } catch(error) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}