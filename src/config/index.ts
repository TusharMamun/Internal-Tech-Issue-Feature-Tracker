import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
path:path.join(process.cwd(),'.env')
});
const config ={
    connectionString :process.env.CONNECTION_STRING as string,
    port:process.env.PORT,

    jwt_access_secret:process.env.ACCESS_SECRET,
    jwt_refresh_secret:process.env.REFRESH_SECRET
}
export default config