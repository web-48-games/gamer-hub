import {Router} from "express";
import {getGameByGameIdController, getGamesController} from "./game.controller";


const basePath = 'apis/game'

const router = Router()

// come back to finish this off later
router.route('/').get(getGamesController)
router.route('/:gameId').get(getGameByGameIdController)


// Authenticated routes
export const gameRoute = {basePath, router}