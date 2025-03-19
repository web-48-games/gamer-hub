import {Router} from "express";
import {getRsvpByRsvpProfileIdController, postRsvpcontroller} from "./rsvp.controller";
import {getMeetupByMeetupIdController} from "../meet-up/meet-up.controller";


const basePath = '/apis/rsvp' as const

const router = Router()

router.route('/')
    .post(postRsvpcontroller)
router.route('/profileId/:ProfileId')
    .get(getRsvpByRsvpProfileIdController)
router.route('/meetupId/:MeetupId')
    .get(getMeetupByMeetupIdController)