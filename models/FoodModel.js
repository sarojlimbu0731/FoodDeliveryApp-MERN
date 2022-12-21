const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const FoodSchema = mongoose.Schema({
    food_name: {
        type: String,
        required: true,
        trim: true
    },
    food_price:{
        type: Number,
        required: true
    },
    food_description:{
        type: String,
        required: true
    },
    category:{
        type: ObjectId,
        ref: 'Category'
    },
    food_image:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Food",FoodSchema)