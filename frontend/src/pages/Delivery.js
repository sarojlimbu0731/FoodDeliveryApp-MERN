import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../api/userAPI'
import Checkout_progress from '../components/Checkout_progress'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { saveDeliveryAddress } from '../redux/actions/bagActions'




const Delivery = () => {
    const { user } = isAuthenticated()
    const delivery_address = useSelector(state => state.bag.delivery_address)
    const [new_delivery_address, setNewDeliveryAddress] = useState({
        city: '',
        tole: '',
        phone: ''
    })

    const dispatch = useDispatch()
    const { city, tole, phone } = new_delivery_address

    let order_items_number = sessionStorage.getItem('bag_items') ? sessionStorage.getItem('bag_items') : 0
    let order_total = sessionStorage.getItem('order_total') ? sessionStorage.getItem('order_total') : 0

    const handleDeliveryInfo = (name) => e => {
        setNewDeliveryAddress({ ...new_delivery_address, [name]: e.target.value })
    }

    const saveDeliveryInfoHandle = () => {
        dispatch(saveDeliveryAddress(new_delivery_address))
    }



    return (
        <div>
            <Navbar />
            <div className='text-end me-5 my-2'>
                <Link to='/bag' className='btn btn-warning'><i className="bi bi-backspace-fill"></i>Go to Bag</Link>
            </div>
            <Checkout_progress delivery />

            <div className='container shadow mx-auto p-5 row my-5'>
                <div className='col-md-8'>
                    <h3 className='text-decoration-underline'>Delivery Information</h3>
                    <div className='container my-5 me-5'>
                        <table className='table ms-0'>
                            <tr>
                                <th width='30%'>City</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleDeliveryInfo('city')} value={city} /></td>
                            </tr>
                            <tr>
                                <th width='30%'>Tole</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleDeliveryInfo('tole')} value={tole} /></td>
                            </tr>
                            <tr>
                                <th width='30%'>Phone</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleDeliveryInfo('phone')} value={phone} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className='btn btn-warning form-control mt-3' onClick={saveDeliveryInfoHandle}>Save Delivery Address</button></td>
                            </tr>
                        </table>


                    </div>
                </div>
                <div className='col-md-4 border-start border-5 mt-3'>
                    <h3 className='text-decoration-underline'>Order Summary</h3>
                    <div className='container mx-auto my-5 text-start ps-5'>
                        <h4>Items: {order_items_number}</h4>
                        <h4>Order Total: Rs.{order_total}</h4>

                        <hr className='my-3' />
                        <h3 className='text-decoration-underline'>Delivery Address</h3>
                        <h4>{user.username}</h4>
                        <h4>{delivery_address.city}</h4>
                        <h4>{delivery_address.tole}</h4>
                        <h4>{delivery_address.phone}</h4>

                        <hr className='my-3' />

                        <Link to='/payment' className='btn btn-warning form-control'>Proceed to Payment</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Delivery