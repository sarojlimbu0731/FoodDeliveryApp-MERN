import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Checkout_progress from '../components/Checkout_progress'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API } from '../config'

const ConfirmOrder = () => {
  const bag_items = useSelector(state => state.bag.bag_items)

  let order_items_number_arr = bag_items ? bag_items.map(items => items.quantity) : []
  let order_items_number = order_items_number_arr.reduce((acc, cur) => acc + cur)
  sessionStorage.setItem('order_items', order_items_number)
  
  let order_total_arr = bag_items ? bag_items.map(item => item.quantity * item.price) : []
  let order_total = order_total_arr.reduce((acc, cur) => acc + cur)
  sessionStorage.setItem('order_total', order_total)

  return (
    <div>
      <Navbar />
      <div className='text-end me-5 my-2'>
        <Link to='/bag' className='btn btn-warning'><i className="bi bi-backspace-fill"></i>Go to Bag</Link>
      </div>
      <Checkout_progress />

      <div className='container shadow mx-auto p-5 row my-5'>
        <div className='col-md-8'>
          <h3 className='text-decoration-underline'>Order Details</h3>
          <div className='container mx-auto my-5'>

            {
              bag_items.length > 0 &&
              <table className='table text-center table-hover table-striped'>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Food Image</th>
                    <th>Food Name</th>
                    <th>Food Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bag_items.map((item, i) => {
                      return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <img src={`${API}/${item.image}`} style={{ height: "80px" }} />
                        </td>
                        <td>{item.name}</td>
                        <td>Rs.{item.price}</td>
                        <td>
                          <div className='px-3'>{item.quantity}</div>
                        </td>
                        <td>
                          Rs.{item.quantity * item.price}
                        </td>
                      </tr>

                    })
                  }
                </tbody>
              </table>
            }
          </div>
        </div>
        <div className='col-md-4 border-start border-5 mt-3'>
          <h3 className='text-decoration-underline'>Order Summary</h3>
          <div className='container mx-auto my-5 text-start ps-5'>
            <h4>Items: {order_items_number}</h4>
            <h4>Order Total: Rs.{order_total}</h4>
            <hr className='my-3' />
            <Link to='/delivery' className='btn btn-warning form-control'>Proceed to Delivery</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ConfirmOrder