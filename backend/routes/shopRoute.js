import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { createEditShop } from '../controllers/shopController.js'
import { upload } from '../middleware/multer.js'

const shopRouter = express.Router()

shopRouter.post("/create-edit", isAuth, upload.single("image") createEditShop)

export default shopRouter