import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../../api/userAPI'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import OrderCard from '../../../components/OrderCard'
import { orderDetails } from '../../../redux/actions/orderActions'



const OrderInfo = () => {
     const { orderId } = useParams()
     const { token } = isAuthenticated()
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(orderDetails(orderId, token))
     }, [])

     const order = useSelector(state => state.orderDetails.order)
     return (
          <>
               <Navbar />
               {
                    order &&
                    <div className='my-5 container mx-auto p-5 shadow'>
                         <div className='row shadow-sm p-2'>
                              <div className='col-10 text-start'>
                                   <h2 className='mb-1' style={{ color: 'orangered' }}>Order Details:</h2>
                              </div>
                              <div className='col-2 btn-group'>
                                   {order.status === 'approved'?
                                     <Link to={`/admin/order/approveOrder/${orderId}`} className='btn btn-warning disabled' >Approve</Link>:
                                     <Link to={`/admin/order/approveOrder/${orderId}`} className='btn btn-warning'>Approve</Link>
                                   }
                                 
                                   <Link to="/admin/orders" className='btn btn-info'> Go Back</Link>
                              </div>
                         </div>

                         <div className='row my-5'>
                              <div className='col-6 text-start'>
                                   <h4>Order Id:  <span className='text-success fs-5'>{order._id}</span></h4>
                                   <h4>Ordered By:  <span className='text-success fs-5'>{order.user.username}</span></h4>
                                   <h4>Total Price:  Rs.<span className='text-success fs-5'>{order.totalAmount}</span></h4>
                                   <h4>Payment Method:<span className='text-success fs-5'>{order.paymentMethod}</span></h4>
                                   <h4>Status:  <span className='text-success fs-5'>{order.status}</span></h4>
                              </div>
                              <div className='col-6 text-start'>
                                   <h3>Delivery Address:</h3>
                                   <h4>City:  <span className='text-success fs-5'>{order.city}</span></h4>
                                   <h4>Tole:  <span className='text-success fs-5'>{order.tole}</span></h4>
                                   <h4>Phone:  <span className='text-success fs-5'>{order.phone}</span></h4>
                              </div>
                         </div>

                         <h4 className='my-3 text-success' >Food Items: </h4>

                         <div className='row row-cols-md-5 g-3'>
                              {
                                   order.orderItems.map((item, i) => {
                                        return <OrderCard food={item.food} quantity={item.quantity} key={i} />
                                   })

                              }
                         </div>

                    </div>
               }

               <Footer />
          </>
     )
}

export default OrderInfo

