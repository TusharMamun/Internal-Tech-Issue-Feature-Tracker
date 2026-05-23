import bcrypt from "bcryptjs";
import { pool } from "../../db"
import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { LogType } from "./login.interface"
import config from "../../config";

const loginUserIntoService=async(payload:LogType)=>{

const {email,password} =payload
const userData = await pool.query(
  `SELECT * FROM users WHERE email=$1`,
  [email],
);
if(userData.rows[0]===0){
    throw new Error("invalid Cradinental")
}
const user = userData.rows[0]


const MetchPassword =await bcrypt.compare(password,user.password)
if(!MetchPassword){
    throw new Error("invalid cradineteal")
}
//generate
const jwtPaylod={
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
}
const Token =jwt.sign(jwtPaylod,config.jwt_access_secret as string,{
    expiresIn:"1d"
}) 

// const resfreshToken =jwt.sign(jwtPaylod,config.jwt_refresh_secret as string,{
//     expiresIn:"20d"
// }) 

delete user.password
return {Token,user}
}

export const loginService ={
    loginUserIntoService
}



