import {Router} from "express";
import {
    getFeaturedGamesController,
    getGameByGameIdController,
    getGameByGameNameController,
    getGamesByGenre,
    getGamesByYearPublished
} from "./game.controller";


const basePath = 'apis/game'

const router = Router()

// come back to finish this off later
router.route('/:gameId').get(getGameByGameIdController)
router.route('/:gameName').get(getGameByGameNameController)
router.route('/games/:genre').get(getGamesByGenre)
router.route('/games/:gameYearPublished').get(getGamesByYearPublished)
router.route('/featured').get(getFeaturedGamesController)

// Authenticated routes
export const gameRoute = {basePath, router}