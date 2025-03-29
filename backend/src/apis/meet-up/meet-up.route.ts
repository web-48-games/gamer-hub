import {Router} from "express";
import {
    postMeetupController,
    deleteMeetupByMeetupIdController,
    getMeetupByMeetupIdController, getMeetupsByRsvpProfileId, getCurrentMeetups, getMeetupsByGame
} from "./meet-up.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/meetups' as const

const router = Router()

router.route('/')
    .post(postMeetupController)
    .get(getCurrentMeetups)
router.route('/:meetupId')
    .delete(isLoggedInController, deleteMeetupByMeetupIdController)
    .get(getMeetupByMeetupIdController)
router.route('/profileId/:rsvpProfileId')
    .get(getMeetupsByRsvpProfileId)
router.route('/:meetupGameId')
    .get(getMeetupsByGame)

export const meetUpRoute = {basePath, router}