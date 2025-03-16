import {Router} from "express";
import {
    getFeaturedGamesController,
    getGameByGameIdController,
    getGameByGameNameController,
    getGamesByGenre,
    getGamesByYearPublished,
    postGamesController
} from "./game.controller";


const basePath = '/apis/games' as const

const router = Router()

// come back to finish this off later
router.route('/').post(postGamesController)
router.route('/gameId/:gameId').get(getGameByGameIdController)
router.route('/gameName/:gameName').get(getGameByGameNameController)
router.route('/genre/:gameGenre').get(getGamesByGenre)
router.route('/year-published/:gameYearPublished').get(getGamesByYearPublished)
router.route('/featured').get(getFeaturedGamesController)

// Authenticated routes
export const gameRoute = { basePath, router }