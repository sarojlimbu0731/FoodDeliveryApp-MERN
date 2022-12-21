const {check, validationResult} = require('express-validator')


exports.userRules = [
    check('username',"username is required").notEmpty()
    .isLength({min:3}).withMessage("username must be at least 3 characters"),
    check('email',"Email is required").notEmpty()
    .isEmail().withMessage("Email format incorrect"),
    check('password',"Password is required").notEmpty()
    .not().isIn(['password','god','asdf1234','123456789']).withMessage("Password must not use common words")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase character")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase character")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[-_!@#$%.+*]/).withMessage("Password must contain at least one special character")
    .isLength({min:8}).withMessage("password must be at least 8 characters")
    .isLength({max:30}).withMessage("password must not be more than 30 characters")
]


exports.categoryRules = [
    check('category_name',"Category is required").notEmpty()
    .isLength({min:3}).withMessage("Category must be at least 3 characters")
    .not().matches(/[0-9]/).withMessage("Category must not contain numbers")
]

exports.foodRules = [
    check('food_name',"Food name is required").notEmpty()
    .isLength({min:3}).withMessage("Food name must be at least 3 characters"),
    check('food_price',"Food Price is required").notEmpty()
    .isNumeric().withMessage("Price must be a number"),
    check('food_description',"Description is required").notEmpty()
    .isLength({min:20}).withMessage("Description must be at least 20 characters"),
    check('category',"category is required").notEmpty(),
    check('food_image',"Food image is required")
]

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    else{
        return res.status(400).json({error: errors.array()[0].msg})
    }
}