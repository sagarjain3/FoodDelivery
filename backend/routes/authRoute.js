import express from 'express'
import { signUp } from '../controllers/authController.js'
import { signIn, signOut } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", signOut)

export default authRouter