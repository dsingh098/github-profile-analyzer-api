import express from "express"
import { login, register, logout, refreshAccessToken,githubAuth, githubCallback } from "../controllers/auth.controller.js"
import { isLogin } from "../middleware/auth.middleware.js"
import passport from "../config/passport.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", isLogin, logout)
router.post("/refresh-access-token", refreshAccessToken)
router.get("/github", githubAuth)
router.get("/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    githubCallback
)

export default router