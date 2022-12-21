const express = require('express')
const foodController= require('../controller/foodController')
const { requireSignin } = require('../controller/userController')
const { upload } = require('../utils/upload')
const {validate, foodRules } = require('../validation')
const router = express.Router()

router.post('/addfood',upload.single('food_image'),foodRules, validate, requireSignin, foodController.addFood)
router.get('/foodlist', foodController.viewfoods)
router.get('/fooddetails/:id', foodController.foodDetails)
router.put('/updatefood/:id', requireSignin, foodController.updatefood)
router.delete('/deletefood/:id', requireSignin, foodController.deletefood)
router.get('/findbycategory/:category_id',foodController.findfoodbyCategory)
router.post('/getfilteredfood',foodController.filterfood)

module.exports = router