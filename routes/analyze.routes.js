import express from "express"
import { analyzeProfile } from "../controllers/analyze.controller.js"

const router = express.Router()

router.get("/:username", analyzeProfile)

export default router