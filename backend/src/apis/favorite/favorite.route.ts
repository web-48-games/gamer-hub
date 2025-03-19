import {Router} from "express";
import {postFavoriteController} from "./favorite.controller";


const basePath = '/apis/favorite' as const

const router = Router()

// come back to finish this off later
router.route('/').post(postFavoriteController)


// Authenticated routes
export const favoriteRouter = { basePath, router }