import {Router} from "express";
import {
    deleteFavoriteController,
    getFavoritesByFavoriteGameIdController,
    getFavoritesByFavoriteProfileIdController,
    postFavoriteController, toggleFavoriteController
} from "./favorite.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/favorites' as const

const router = Router()

router.route('/')
    .post(isLoggedInController, postFavoriteController)
router.route('/profile-id/:favoriteProfileId')
    .get(getFavoritesByFavoriteProfileIdController)
router.route('/game-id/:favoriteGameId')
    .get(getFavoritesByFavoriteGameIdController)
    .delete(isLoggedInController, deleteFavoriteController)
router.route('/toggle')
    .post(isLoggedInController, toggleFavoriteController)



// Authenticated routes
export const favoriteRouter = { basePath, router }