import {Request, Response} from 'express'
import {Favorite, FavoriteSchema} from "./favorite.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {PublicProfile} from "../profile/profile.model";
import {
    deleteFavorite,
    insertFavorite,
    selectFavoritesByFavoriteGameId,
    selectFavoritesByFavoriteProfileId
} from "./favorite.model";
import {z} from "zod";

export async function postFavoriteController(request: Request, response: Response) : Promise<Response> {
    try {
        const validationResult = FavoriteSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // deconstruct gameId
        const {favoriteGameId} = validationResult.data

        // deconstruct profile and profileId from session
        const profile = request.session.profile as PublicProfile
        const favoriteProfileId = profile.profileId as string

        // create a favorite object
        const favorite: Favorite = {
            favoriteGameId,
            favoriteProfileId
        }

        let result = await insertFavorite(favorite)

        return response.json({
            status: 200,
            message: result,
            data: null
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

export async function getFavoritesByFavoriteGameIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const validationResult = z.string().uuid("Please provide a valid favoriteGameId").safeParse(request.params.favoriteGameId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const favoriteGameId = validationResult.data
        const result = await selectFavoritesByFavoriteGameId(favoriteGameId)

        return response.json({
            status: 200,
            message: null,
            data: result
        })

    } catch(error) {
        console.error(error)
        return response.json({
            status:500,
            message: error.message,
            data:null
        })
    }
}

export async function getFavoritesByFavoriteProfileIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const validationResult = z.string().uuid("Please provide a valid favoriteProfileId").safeParse(request.params.favoriteProfileId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const favoriteProfileId = validationResult.data
        const result = await selectFavoritesByFavoriteProfileId(favoriteProfileId)

        return response.json({
            status: 200,
            message: null,
            data: result
        })
    } catch(error) {
        console.error(error)
        return response.json({
            status:500,
            message: error.message,
            data:null
        })
    }
}

export async function toggleFavoriteController(request: Request, response: Response) : Promise<Response> {
    try {

    } catch(error) {
        console.error(error)
        return response.json({
            status:500,
            message: error.message,
            data:null
        })
    }
}

export async function deleteFavoriteController(request: Request, response: Response) : Promise<Response> {
    try {
        const validationResult = FavoriteSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {favoriteGameId} = validationResult.data
        const profile = request.session.profile as PublicProfile
        const favoriteProfileId = profile.profileId as string

        const favorite: Favorite = {
            favoriteGameId,
            favoriteProfileId
        }

        let message = await deleteFavorite(favorite)
        return response.json({
            status: 200,
            message: message,
            data: null
        })

    } catch(error) {
        console.error(error)
        return response.json({
            status:500,
            message: error.message,
            data:null
        })
    }
}