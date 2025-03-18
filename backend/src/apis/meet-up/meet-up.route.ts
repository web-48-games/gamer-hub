import {Router} from "express";
import {postMeetupController, deleteMeetupByMeetupIdController} from "./meet-up.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/meetups' as const

const router = Router()

router.route('/').post(postMeetupController)
router.route('/:meetupId').delete(isLoggedInController, deleteMeetupByMeetupIdController)


export const meetUpRoute = {basePath, router}