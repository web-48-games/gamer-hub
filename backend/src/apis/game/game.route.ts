import {Router} from "express";
import {
    getFeaturedGamesController,
    getGameByGameIdController,
    getGameByGameNameController, getGameGenres, getGamesByFavoriteProfileId,
    getGamesByGenre,
    getGamesByYearPublished,
    postGamesController
} from "./game.controller";


const basePath = '/apis/games' as const

const router = Router()

// come back as needed to add or modify routes
// router.route('/').post(postGamesController)
router.route('/gameId/:gameId').get(getGameByGameIdController)
router.route('/gameName/:gameName').get(getGameByGameNameController)
router.route('/genre/:gameGenre').get(getGamesByGenre)
// router.route('/year/:gameYearPublished').get(getGamesByYearPublished)
router.route('/featured').get(getFeaturedGamesController)
router.route('/favorites/:favoriteProfileId').get(getGamesByFavoriteProfileId)
router.route('/allGenres/').get(getGameGenres)

// Authenticated routes
export const gameRoute = { basePath, router }