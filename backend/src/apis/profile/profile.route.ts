
import {Router} from 'express'
import {getPublicProfileByProfileNameController} from "./profile.controller";


const basePath = '/apis/profiles'


const router = Router()


// router.route('/')
router.route('/name/:profileName').get(getPublicProfileByProfileNameController)


export const profileRoute = {basePath, router}