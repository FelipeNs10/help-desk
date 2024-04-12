import express from "express"
import { indexHandler, loginController, loginHandler, registerController, registerHandler } from "../controller/userController.js"

const router = express.Router()

router.get("/", indexHandler)

// User
router.get("/login", loginHandler)

router.post("/login", loginController)

router.get("/register", registerHandler)

router.post("/register", registerController)

export default router