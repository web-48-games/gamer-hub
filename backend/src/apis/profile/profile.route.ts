
import {Router} from 'express'
import {
    deleteProfileByProfileIdController,
    getMeetupsByProfileIdController,
    getPublicProfileByProfileIdController,
    getPublicProfileByProfileNameController,
    putProfileController
} from "./profile.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/profiles'


const router = Router()


// router.route('/')

router.route('/name/:profileName').get(getPublicProfileByProfileNameController)
router.route('/id/:profileId')
    .get(getPublicProfileByProfileIdController)
    .put(isLoggedInController, putProfileController)
    .delete(deleteProfileByProfileIdController)
// router.route('/meetups/:profileId').get(getMeetupsByProfileIdController)


export const profileRoute = {basePath, router}