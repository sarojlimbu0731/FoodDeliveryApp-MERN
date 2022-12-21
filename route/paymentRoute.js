const express = require('express')
const { sendKey, verifyPayment } = require('../controller/paymentController')
const router = express.Router()


router.get('/getpublicKey', sendKey)
router.post('/processPayment',verifyPayment)

module.exports = router