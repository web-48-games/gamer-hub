import {GameSchema} from "./game.validator";
import {Request, Response} from "express";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    Game, insertGame, selectAllGenres, selectFavoriteGames,
    selectFeaturedGames,
    selectGameByGameId,
    selectGameByGameName,
    selectGamesByGameYearPublished,
    selectGamesByGenre, selectGamesByGenres
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

export async function getGamesByGenres(request: Request, response: Response): Promise<Response> {
    try {

        const validationResult = z.string({message: 'please provide valid gameGenre'}).array().safeParse(Object.values(request.query))

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const gameGenres = validationResult.data
        const games = await selectGamesByGenres(gameGenres)

        return response.json({ status: 200, message: 'games', data: games })

    } catch(error) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

export async function getGamesByYearPublished(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = GameSchema.pick({gameYearPublished: true}).safeParse(request.params)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {gameYearPublished} = validationResult.data
        // year is good to use for our model method
        const gamesData = await selectGamesByGameYearPublished(gameYearPublished)

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

export async function getGameGenres(request: Request, response: Response): Promise<Response> {
    try {
        const allGenres = await selectAllGenres()
        const genres: string[] = allGenres.map(genre => genre.unnest)
        return response.json({
            status: 200,
            message: 'All Genres found successfully',
            data: genres
        })

    } catch(error) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

