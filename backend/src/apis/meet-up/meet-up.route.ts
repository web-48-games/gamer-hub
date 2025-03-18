import {Router} from "express";
import {
    postMeetupController,
    deleteMeetupByMeetupIdController,
    getMeetupByMeetupIdController
} from "./meet-up.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/meetups' as const

const router = Router()

router.route('/').post(postMeetupController)
router.route('/:meetupId').delete(isLoggedInController, deleteMeetupByMeetupIdController)
router.route('/meetupId/:meetupId').get(getMeetupByMeetupIdController)

export const meetUpRoute = {basePath, router}