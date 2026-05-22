import { Router, type Request, type Response } from "express";
import { UserController } from "./user.controller";

const router = Router()
export const UserRout =router
router.post('/signup', UserController.CreatUser)
