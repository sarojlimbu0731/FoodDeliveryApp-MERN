const express = require('express')
require('dotenv').config()
require('./database/connection')
const cors = require('cors')
const path= require('path')
const morgan = require('morgan')



//importing routes
const UserRoute = require('./route/userRoute')
const CategoryRoute = require('./route/categoryRoute')
const FoodRoute = require('./route/foodRoute')
const OrderRoute = require('./route/orderRoute')
const PaymentRoute = require('./route/paymentRoute')


const app = express()
// var corOptions = {
//      origin:"http://localhost:3000"
// }


//middleware
// app.use(cors(corOptions))
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api',CategoryRoute)
app.use('/api',FoodRoute)
app.use('/api',UserRoute)
app.use('/api',OrderRoute)
app.use('/api',PaymentRoute)
app.use('/api/public/uploads', express.static('public/uploads'))

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
     console.log("Server started at port " + PORT)
})