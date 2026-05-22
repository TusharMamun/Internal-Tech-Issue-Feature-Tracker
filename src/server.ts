import { app } from "./app"
import config from "./config"
import { initDb } from "./db"

const main=()=>{

app.listen(config.port, () => {
initDb()
  console.log(`Example app listening on port ${config.port}`)
})
}
main()