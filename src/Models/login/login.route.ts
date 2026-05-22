import { Router } from "express";
import { logincontroller } from "./login.controller";

const router = Router()

router.post('/login',logincontroller.loginUser)


export const LoginRoute = router