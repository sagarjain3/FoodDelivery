import Shop from "../models/shopModel.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createEditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body
        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        let shop = await Shop.findOne({ owner: req.userId })

        // shop create kr rhe h else me shop update kr rhe agr shop phele se create h toh

        if (!shop) {
            shop = await Shop.create({
                name, city, state, address, image, owner: req.userId
            })
        } else {
            shop = await Shop.findByIdAndUpdate(shop._id, {
                name, city, state, address, image, owner: req.userId
            }, { new: true })
        }

        await shop.populate("owner")
        return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json(`create shop  error ${error}`)

    }
}