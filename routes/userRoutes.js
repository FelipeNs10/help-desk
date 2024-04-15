import express from "express"
import { indexHandler, 
    loginController, 
    loginHandler, 
    registerController, 
    registerHandler, 
    formHandler,
    formController,
} from "../controller/userController.js"
import { authenticateJWT } from "../middlewares/autenticateJWT.js";

const router = express.Router()

router.get("/", indexHandler)

// Usuario
router.get("/login", loginHandler)
router.post("/login", loginController)
router.get("/register", registerHandler)
router.post("/register", registerController)

//form
router.get("/form", authenticateJWT, formHandler)
router.post("/form", authenticateJWT, formController)

export default router