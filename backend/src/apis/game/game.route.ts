import {Router} from "express";


const basePath = 'apis/game'

const router = Router()

// come back to finish this off later
router.route('/').get()


export const gameRoute = {basePath, router}