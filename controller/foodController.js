const Food = require('../models/FoodModel')


// add new food item
exports.addFood = async (req, res) => {
    let food = new Food({
        food_name: req.body.food_name,
        food_price: req.body.food_price,
        food_description: req.body.food_description,
        category: req.body.category,
        food_image: req.file.path
    })
    food = await food.save()
    if (!food) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(food)
}

// view foods
exports.viewfoods = async (req, res) => {
    let foods = await Food.find().populate('category', 'category_name')
    if (!foods) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(foods)
}

// view food details
exports.foodDetails = async (req, res) => {
    let food = await Food.findById(req.params.id).populate('category', 'category_name')
    if (!food) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(food)
}


// update food
exports.updatefood = async (req, res) => {
    let food = await Food.findByIdAndUpdate(req.params.id, {
        food_name: req.body.food_name,
        food_price: req.body.food_price,
        food_description: req.body.food_description,
        category: req.body.category
    },
        { new: true })
    if (!food) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(food)
}

// delete food
exports.deletefood = async (req, res) => {
    let food = await Food.findByIdAndDelete(req.params.id)
    if (!food) {
        return res.status(400).json({ error: "food item not found." })
    }
    return res.status(200).json({ message: "food item deleted successfully." })
}

// find by category
exports.findfoodbyCategory = async (req, res) => {
    let foods = await Food.find({ category: req.params.category_id })
    if (!foods) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(foods)
}

// filter food
exports.filterfood = async (req, res) => {
    if (!req.body.categoryId) {
        let foods = await Food.find({}).populate('category', 'category_name').sort([['food_name', 'asc']])
        if (!foods) {
            return res.status(400).json({ error: "Something went wrong." })
        }
        return res.status(200).send(foods)

    }
    else {
        let filteredfoods = await Food.find({ category: req.body.categoryId }).populate('category', 'category_name').sort([['food_name', 'asc']])
        if (!filteredfoods) {
            return res.status(400).json({ error: "Something went wrong." })
        }
        return res.status(200).send(filteredfoods)
    }
}
