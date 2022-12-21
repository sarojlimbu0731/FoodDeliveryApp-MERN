const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = mongoose.Schema({
    orderItems : [{
            type: ObjectId,
            ref: "OrderItems",
            required: true
    }],
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    city:{
        type: String,
        required: true
    },
    tole:{
        type: String,
        required: true
    },
   
    phone:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)