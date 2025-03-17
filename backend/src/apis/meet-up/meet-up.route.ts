import {Router} from "express";
import {postMeetupController} from "./meet-up.controller";


const basePath = '/apis/meetups' as const

const router = Router()

router.route('/').post(postMeetupController)






export const meetUpRoute = {basePath, router}