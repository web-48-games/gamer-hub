import {Router} from "express";
import {postMeetupController} from "./meet-up.controller";
import {deleteMeetupByMeetupId} from "./meet-up.model";


const basePath = '/apis/meetups' as const

const router = Router()

router.route('/').post(postMeetupController)
router.route('/:meetupId').delete(deleteMeetupByMeetupId)






export const meetUpRoute = {basePath, router}