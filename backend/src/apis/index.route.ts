import { Router } from 'express'
import { indexController } from './index.controller'

// define the base path for the route

const basePath = '/apis'

const router = Router()

router.route('/')
    .get(indexController)

export const indexRoute = {
    router,
    basePath
}