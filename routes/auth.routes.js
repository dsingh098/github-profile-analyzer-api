import express from "express"
import { login, register, logout, refreshAccessToken } from "../controllers/auth.controller.js"
import { isLogin } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", isLogin, logout)
router.post("/refresh-access-token", refreshAccessToken)

export default router