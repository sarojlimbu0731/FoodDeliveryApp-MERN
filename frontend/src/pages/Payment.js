import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API } from '../config'
import { isAuthenticated } from '../api/userAPI'
import Checkout_progress from '../components/Checkout_progress'
import { placeOrder } from '../redux/actions/orderActions'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import Khalti from '../components/Khalti/Khalti'
import { getPublicKey } from '../components/Khalti/KhaltiKey'



const Payment = () => {
  const bag_items = useSelector(state => state.bag.bag_items)
  const delivery_address = useSelector(state => state.bag.delivery_address)

  let order_total = sessionStorage.getItem('order_total') ? sessionStorage.getItem('order_total') : 0
  const { user, token } = isAuthenticated()
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const paymentmethods = ['cash on delivery', 'khalti payment']
  const [paymentmethod, setpaymentmethod] = useState('')
  const [publicKey, setpublicKey] = useState('');

  let order = {
    orderItems: bag_items,
    userId: user._id,
    paymentMethod: paymentmethod,
    city: delivery_address.city,
    tole: delivery_address.tole,
    phone: delivery_address.phone
  }

  useEffect(() => {
    getPublicKey().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setpublicKey(data)
      }
    })
  }, []);

  const makeOrder = async (e) => {
    e.preventDefault()

    dispatch(placeOrder(order, token))
    toast.success("Order Success.")

    localStorage.removeItem('bag_items')
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }

  const handleChange = (e) => {
    setpaymentmethod(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div>
      <ToastContainer position='top-right' autoClose={1000} />
      <Navbar />
      <div className='text-end me-5 my-2'>
        <Link to='/bag' className='btn btn-warning'><i className="bi bi-backspace-fill"></i>Go to Bag</Link>
      </div>
      <Checkout_progress delivery payment />

      <div className='container shadow mx-auto p-5 row my-5'>
        <div className='col-md-8'>
          <h3 className='text-decoration-underline'>Order Summary</h3>
          <div className='container mx-auto my-5 text-start ps-5'>
            <table className='table text-center align-middle'>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Foods</th>
                  <th>Food Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                {
                  bag_items &&
                  bag_items.map((item, i) => {
                    return <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={`${API}/${item.image}`} style={{ height: '80px' }} alt='' />
                      </td>
                      <td>{item.name}</td>
                      <td>Rs.{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>Rs.{item.quantity * item.price}</td>
                    </tr>
                  })
                }
                <tr>
                  <td colSpan={6}><h3>Total Amount: Rs.{order_total}</h3></td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

            <hr className='my-3' />
            <h3 className='text-decoration-underline'>Delivery Address</h3>
            <h5>{user.username}</h5>
            <h5>{delivery_address.city}</h5>
            <h5>{delivery_address.tol}</h5>
            <h5>{delivery_address.phone}</h5>
            <hr className='my-3' />

          </div>
        </div>

        <div className='col-md-4 border-start border-5 mt-3 text-start ps-5'>
          <Khalti amount={order_total * 10} publicKey={publicKey} />
          {
            paymentmethods.map((method, i) => {
              return <div className="form-check my-2" key={i}>
                <input className="form-check-input mt-1 me-2" type="radio" name="flexRadioDefault" id={`flexRadioDefault1${i}`} onChange={handleChange} value={method} />
                <label className="form-check-label text-success font-weight-bold fs-5" htmlFor={`flexRadioDefault1${i}`}>
                  {method}
                </label>
              </div>
            })
          }

          <div className='p-3 shadow-sm bg-light font-weight-bold text-center'>
            <p style={{ color: 'black' }}>Click below to confirm your order!</p>
            <button className='btn btn-warning mt-3 form-control text-white' onClick={makeOrder}>Order Now</button>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  )

}

export default Payment