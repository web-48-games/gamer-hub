import {Router} from "express";
import {getRsvpByRsvpMeetupIdController, getRsvpByRsvpProfileIdController, postRsvpcontroller} from "./rsvp.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/rsvp' as const

const router = Router()

router.route('/')
    .post(isLoggedInController, postRsvpcontroller)
router.route('/profileId/:rsvpProfileId')
    .get(getRsvpByRsvpProfileIdController)
router.route('/meetupId/:rsvpMeetupId')
    .get(getRsvpByRsvpMeetupIdController)
export const rsvpRoute = {basePath, router}