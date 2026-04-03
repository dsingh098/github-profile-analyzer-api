import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./config/db.js"
import config from "./config/config.js"
import authRouter from "./routes/auth.routes.js"


const app = express()
const port = config.PORT 

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// end-point 

app.use("/api/auth", authRouter)


// start server and conntected Db
connectDb()
app.listen(port, () => {
    console.log(`Server is connected on port ${port}`)
})
