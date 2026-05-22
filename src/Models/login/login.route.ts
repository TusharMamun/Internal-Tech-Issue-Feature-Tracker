import { Router } from "express";
import { logincontroller } from "./login.controller";
import { UserController } from "../user/user.controller";
import { loginService } from "./login.service";

const router = Router()

router.post('/login',logincontroller.loginUser)


export const LoginRoute = router