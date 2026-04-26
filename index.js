import express from "express"
import cors from "cors"
import analyzeRouter from "./routes/analyze.routes.js"
import env from "./config/env.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}))

app.use("/api/analyze", analyzeRouter)

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
})