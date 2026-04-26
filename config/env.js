import dotenv from "dotenv"
dotenv.config()

const requiredEnvVars = ["PORT", "GITHUB_TOKEN", "GROQ_API_KEY"]

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`${key} should be present in environment variable`)
    }
})

const env = {
    PORT: process.env.PORT,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
}

export default env