import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AddCategory from './pages/Admin/Category/AddCategory'
import Category from './pages/Admin/Category/Category'
import DeleteCategory from './pages/Admin/Category/DeleteCategory'
import UpdateCategory from './pages/Admin/Category/UpdateCategory'
import ConfirmEmail from './pages/ConfirmEmail'
import ConfirmOrder from './pages/ConfirmOrder'
import Home from './pages/Home'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import UserProfile from './pages/User/UserProfile'
import Foods from './pages/Admin/Foods/Foods'
import AddFood from './pages/Admin/Foods/AddFood'
import UpdateFood from './pages/Admin/Foods/UpdateFood'
import DeleteFood from './pages/Admin/Foods/DeleteFood'
import Payment from './pages/Payment'
import User from './pages/Admin/Users/User'
import DeleteUser from './pages/Admin/Users/DeleteUser'
import UserOrders from './pages/Admin/Users/UserOrders'
import OrderInfo from './pages/Admin/Orders/OrderInfo'
import DeleteOrder from './pages/Admin/Orders/DeleteOrder'
import ApproveOrder from './pages/Admin/Orders/ApproveOrder'
import Order from './pages/Admin/Orders/Order'
import Bag from './pages/Bag'
import { AdminRoutes, UserRoutes } from './pages/filterRoutes'
import OrderDetails from './pages/User/OrderDetails'
import Delivery from './pages/Delivery'


const Myroutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/confirmEmail/:token' element={<ConfirmEmail />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />

        <Route path='/' element={<UserRoutes />}>
          <Route path='/bag' element={<Bag />} />
          <Route path='/confirmorder' element={<ConfirmOrder />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/orderDetails/:orderId' element={<OrderDetails />} />
        </Route>

        <Route path='/' element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />

          <Route path='/admin/orders' element={<Order />} />
          <Route path='/admin/order/orderInfo/:orderId' element={<OrderInfo />} />
          <Route path='/admin/order/delete/:orderId' element={<DeleteOrder />} />
          <Route path='/admin/order/approveOrder/:orderId' element={<ApproveOrder />} />

          <Route path='/admin/users' element={<User />} />
          <Route path='/admin/user/delete/:userId' element={<DeleteUser />} />
          <Route path='/admin/user/userOrders/:userId' element={<UserOrders />} />

          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/category/add' element={<AddCategory />} />
          <Route path='/admin/category/update/:id' element={<UpdateCategory />} />
          <Route path='/admin/category/delete/:id' element={<DeleteCategory />} />

          <Route path='/admin/foods' element={<Foods />} />
          <Route path='/admin/food/add' element={<AddFood />} />
          <Route path='/admin/food/update/:foodId' element={<UpdateFood />} />
          <Route path='/admin/food/delete/:foodId' element={<DeleteFood />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default Myroutes