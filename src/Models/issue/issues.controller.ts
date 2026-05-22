import type { Request, Response } from "express";
import { issuService } from "./Issues.service";
import Jwt, { type JwtPayload }  from "jsonwebtoken";
import config from "../../config";
const CreatIssuFild= async (req:Request,res:Response)=>{
try {
  
    const token =  req.headers.authorization 

    
if (!token) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized: Token is missing"
  })
}
  const decoded = Jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload


   const result = await issuService.creataIssuIntoDb(
      req.body,
      decoded.id as string
    )
    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result
    })
} catch (error:any) {
    res.status(401).json({
        message:"Somthin is wrong",
        error:error.message
    })
}
}

const getSingleIssu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await issuService.singleIssu(id as string)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Issue fetched successfully",
      data: result
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}
const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const payload = req.body

    const result = await issuService.updateIssu(payload,id as string)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}
const deletIssu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await issuService.DeletIssueInDb(id as string)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
      data: result
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query



    
    const result = await issuService.getAllysrDatainDb({
      sort: sort as string,
      type: type as string,
      status: status as string
    })

    return res.status(200).json({
      success: true,
      message: "Issues fetched successfully",
      data: result
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}




export const allIssuesCollection={
    CreatIssuFild,
    getSingleIssu,
    UpdateUser,
    deletIssu,
getAllIssues
}