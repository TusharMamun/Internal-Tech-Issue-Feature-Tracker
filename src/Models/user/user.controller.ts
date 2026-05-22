import type { Request, Response } from "express";
import { UserDatabase } from "./user.service";


const CreatUser =async(req:Request,res:Response)=>{
try {
  const result = await UserDatabase.RegesterUserInDb(req.body)

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result
  })

} catch (error:any) {

  res.status(500).json({
    success: false,
    message: error.message || "Something went wrong in usrController (cdl:19) "
  })

}
}
export const UserController ={
    CreatUser
}