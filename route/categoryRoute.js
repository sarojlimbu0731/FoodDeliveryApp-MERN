const express = require('express')
const categoryController = require("../controller/categoryController")
const { requireSignin } = require('../controller/userController')
const { categoryRules, validate } = require('../validation')
const router = express.Router()


router.post('/postCategory', categoryRules, validate,requireSignin, categoryController.addCategory)
router.get('/viewcategories', categoryController.viewCategories)
router.get('/categorydetails/:id', categoryController.categoryDetails)
router.put('/updatecategory/:id', requireSignin, categoryController.updateCategory)
router.delete('/deletecategory/:id', requireSignin, categoryController.deleteCategory)


module.exports = router