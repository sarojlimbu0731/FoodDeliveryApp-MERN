const Order = require('../models/orderModel')
const OrderItems = require('../models/orderItemsModel')
const { sendEmail } = require('../utils/sendEmail')


exports.placeOrder = async (req, res) => {
    const orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItem => {
            let orderItem2 = new OrderItems({
                food: orderItem.food,
                quantity: orderItem.quantity
            })
            orderItem2 = await orderItem2.save()
            if (!orderItem2) {
                return res.status(400).json({ error: "failed to place order." })
            }
            return orderItem2._id
        })
    )

    let individualTotal = await Promise.all(
        orderItemsIds.map(async orderItem => {
            const itemOrder = await OrderItems.findById(orderItem).populate('food', 'food_price')
            const total = itemOrder.quantity * itemOrder.food.food_price
            return total
        })
    )

    let totalPrice = individualTotal.reduce((acc, cur) => acc + cur)

    let order = new Order({
        orderItems: orderItemsIds,
        user: req.body.userId,
        totalAmount: totalPrice,
        paymentMethod:req.body.paymentMethod,
        city: req.body.city,
        tole: req.body.tole,
        phone: req.body.phone
    })
    order = await order.save()
    const url = `http://localhost:3000/admin/order/approveOrder/${order._id}`
     sendEmail({
          from: "noreply@something.com",
          to: 'admin@gmail.com',
          subject: "Order Placement",
          text: " click on the button below to confirm the order." + url,
          html: `<a href='${url}'><button>CONFIRM ORDER</button></a>`
     })
    if (!order) {
        return res.status(400).json({ error: "failed to place order." })
    }
    res.send(order)
}

//view all orders
exports.viewOrders = async (req, res) => {
    let orders = await Order.find().populate('user', 'username')
    if (!orders) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(orders)
}

//to view order details
exports.orderDetails = async (req, res) => {
    let order = await Order.findById(req.params.id).populate('user', 'username')
        .populate({ path: 'orderItems', populate: { path: 'food', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// to find orders of a user
exports.userOrders = async (req, res) => {
    let order = await Order.find({ user: req.params.userId }).populate({ path: 'orderItems', populate: { path: 'food', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(order)
}

// to update order
exports.updateOrder = async (req, res) => {
    let order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    },
        { new: true })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(order)
}

// to delete order
exports.deleteOrder = async (req, res) => {
    let order = await Order.findByIdAndRemove(req.params.orderId)
    if (!order) {
        return res.status(400).json({ error: "Order not found." })
    }
    else {
        let orderitems = await Promise.all(order.orderItems.map(async orderItem => await OrderItems.findByIdAndDelete(orderItem)))
        if(!orderitems){
            return res.status(400).json({error:"Failed to delete order."})
        }
        else{
            return res.status(200).json({message: "Order deleted Successfully."})
        }
    }          
}