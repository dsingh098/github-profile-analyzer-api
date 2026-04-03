import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGO_URL) {
    throw new Error("Mongo URL should be present in environment variable")
}

if(!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Access token should be present in environment variable")
}

if(!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh token secret should be present in environment variable")
}

if(!process.env.PORT) {
    throw new Error("Port should be present in environment variable")
}

const config = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}

export default config