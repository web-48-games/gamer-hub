import {Router} from "express";
import {
    postMeetupController,
    deleteMeetupByMeetupIdController,
    getMeetupByMeetupIdController, getMeetupsByRsvpProfileId
} from "./meet-up.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/meetups' as const

const router = Router()

router.route('/').post(postMeetupController)
router.route('/:meetupId').delete(isLoggedInController, deleteMeetupByMeetupIdController)
router.route('/meetupId/:meetupId').get(getMeetupByMeetupIdController)
router.route('/profileId/:rsvpProfileId')
    .get(getMeetupsByRsvpProfileId)

export const meetUpRoute = {basePath, router}