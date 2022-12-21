const express = require('express')
const { placeOrder, viewOrders, orderDetails, userOrders, updateOrder, deleteOrder } = require('../controller/orderController')
const { requireSignin } = require('../controller/userController')
const router = express.Router()

router.post('/placeorder',placeOrder)
router.get('/userorder/:userId',requireSignin, userOrders)
router.get('/orderdetails/:id', requireSignin, orderDetails)
router.get('/vieworders', viewOrders)
router.put('/updateorder/:id', updateOrder)
router.delete('/deleteorder/:orderId', deleteOrder)

module.exports = router