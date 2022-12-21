import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutProgress = ({ delivery,payment}) => {
  return (
    <div className='d-flex gap-2 mx-5 px-5'>
      
      <Link to='/confirmorder' className='btn btn-success'>Confirm Order</Link>
      {
        delivery ?
          <Link to='/delivery' className='btn btn-success'>Delivery</Link> :
          <Link to='/delivery' className='btn btn-secondary disabled' >Delivery</Link>

      }
      {
        payment ?
          <Link to='/payment' className='btn btn-success'>Payment</Link> :
          <Link to='/payment' className='btn btn-secondary disabled' >Payment</Link>
      }

    </div>
  )
}

export default CheckoutProgress