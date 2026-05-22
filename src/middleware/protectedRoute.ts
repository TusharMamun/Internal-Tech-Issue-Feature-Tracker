import Jwt, { type JwtPayload } from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express"
import config from "../config"
import { pool } from "../db"

export const Protecte = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access. Token is missing."
        })
      }

      const decoded = Jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload

      const usrData = await pool.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [decoded.email]
      )

      if (usrData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        })
      }

      const user = usrData.rows[0]


      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have permission"
        })
      }

      // attach user to request (optional but useful)
      ;(req as any).user = user

      next()
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: error.message
      })
    }
  }
}