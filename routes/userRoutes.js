import express from "express"
import { indexHandler, loginController, loginHandler, registerController, registerHandler } from "../controller/userController.js"
import { authenticateJWT } from "../middlewares/autenticateJWT.js";

const router = express.Router()

router.get("/", indexHandler)

// Usuario
router.get("/login", loginHandler)
router.post("/login", loginController)
router.get("/register", registerHandler)
router.post("/register", registerController)

// rota de teste
router.get("/autenticado", authenticateJWT, (req, res) => {
    res.render("autenticado")
})

export default router