
import {Router} from 'express'
import {getPublicProfileByProfileIdController, getPublicProfileByProfileNameController} from "./profile.controller";


const basePath = '/apis/profiles'


const router = Router()


// router.route('/')
router.route('/name/:profileName').get(getPublicProfileByProfileNameController)
router.route('/id/:profileId').get(getPublicProfileByProfileIdController)

export const profileRoute = {basePath, router}