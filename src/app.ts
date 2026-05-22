import express, { type Application, type Request, type Response } from'express'
import { UserRout } from './Models/user/user.route';
import { LoginRoute } from './Models/login/login.route';
import { issuesRouter } from './Models/issue/Issues.route';
import { loginService } from './Models/login/login.service';
import cors from 'cors'
import globalErrorHndlller from './middleware/GlobalError';
export const app:Application = express()
app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended:true}))

let corsOptions = {
  origin:"http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.get('/', (req:Request, res:Response) => {
res.status(200).json({
    "message":"express Server ",
    "author":"MD Tushar mamun"
})
})

app.use("/api/auth",UserRout)
app.use("/api/auth",LoginRoute )
app.use('/api/issues',issuesRouter)

app.use(globalErrorHndlller);