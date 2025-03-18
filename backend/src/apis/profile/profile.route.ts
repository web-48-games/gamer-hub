
import {Router} from 'express'
import {
    getPublicProfileByProfileIdController,
    getPublicProfileByProfileNameController,
    putProfileController
} from "./profile.controller";


const basePath = '/apis/profiles'


const router = Router()


// router.route('/')
router.route('/name/:profileName').get(getPublicProfileByProfileNameController)
router.route('/id/:profileId')
    .get(getPublicProfileByProfileIdController)
    .put(putProfileController) // consider putting in an isLoggedInController
router.route('/')

export const profileRoute = {basePath, router}