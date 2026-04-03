import jwt from "jsonwebtoken"
import config from  "./config.js"

export const generateAccessToken = (id) => {
    return jwt.sign(
        { id },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )
}

export const generateRefreshToken = (id) => {
    return jwt.sign(
        { id },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    )
}