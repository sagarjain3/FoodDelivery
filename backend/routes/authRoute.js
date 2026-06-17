import express from 'express'
import { resetPassword, sendOTP, signUp, verifyOTP } from '../controllers/authController.js'
import { signIn, signOut } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", signOut)
authRouter.post("/send-otp", sendOTP)
authRouter.post("/verify-otp", verifyOTP)
authRouter.post("/reset-password", resetPassword)

export default authRouter