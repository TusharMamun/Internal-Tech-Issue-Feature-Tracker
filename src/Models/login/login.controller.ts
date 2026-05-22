import type { Request, Response } from "express"
import { loginService } from "./login.service"

const loginUser=async(req:Request,res:Response)=>{
try {
const result =await loginService.loginUserIntoService(req.body)

  res.status(201).json({
    success: true,
    message: "Login successful",
    // data: result
  })

} catch (error:any) {

  res.status(500).json({
    success: false,
    message: error.message || "Something went wrong in usrController (cdl:19) "
  })

}
}
export const logincontroller ={
    loginUser
}