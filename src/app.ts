import express, { type Application, type Request, type Response } from'express'
import { UserRout } from './Models/user/user.route';
import { LoginRoute } from './Models/login/login.route';
export const app:Application = express()
app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended:true}))

app.get('/', (req:Request, res:Response) => {
res.status(200).json({
    "message":"express Server ",
    "author":"MD Tushar mamun"
})
})

app.use("/api/auth",UserRout)
app.use("/api/auth",LoginRoute)