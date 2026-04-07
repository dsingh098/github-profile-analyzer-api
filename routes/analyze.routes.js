import express from "express"
import { analyzeDetailed, analyzePublic } from "../controllers/analyze.controller.js"
import { isLogin } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/:username/detailed", isLogin, analyzeDetailed)  // protected
router.get("/:username", analyzePublic)                       // public

export default router   