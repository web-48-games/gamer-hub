import {Router} from "express";
import {signInController} from "./sign-in.controller";


const basePath = '/apis/sign-in' as const
const router = Router()
router.route('/').post(signInController)

export const signInRoute = { basePath, router }