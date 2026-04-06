import dotenv from "dotenv"
dotenv.config()

const requiredEnvVars = [
    "MONGO_URL",
    "PORT",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET"
]

requiredEnvVars.forEach((key) => {
    if(!process.env[key]) {
        throw new Error(`${key} should be present in environment variable`)
    }
})
const env = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    GITHUB_CLIENT_ID:process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
    
}

export default env