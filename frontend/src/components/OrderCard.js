import React from 'react'
import { API } from '../config'


const OrderCard = ({food,quantity}) => {
  return (
    <>
    <div className="col mb-3">
    <div className="card">
      <img src={`${API}/${food.food_image}`} className="card-img-top" alt="..." style={{height:"150px"}}/>
      <div className="card-body">
        <h5 className="card-title text-truncate">{food.food_name}</h5>
        <h6 className="card-title">Rs.{food.food_price}</h6>
        <h6 className='card-title'>Quantity: {quantity}</h6>
      </div>
    </div>
  </div>
    </>
  )
}

export default OrderCard