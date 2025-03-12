import {Router} from "express";
import {signUpController} from "./sign-up.controller";


const basePath = '/apis/sign-up' as const


const router = Router()

router.route('/').post(signUpController)

export const signUpRoute = { basePath, router}