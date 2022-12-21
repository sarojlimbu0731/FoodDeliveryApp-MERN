import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const HomeTotalTag = () => {
     const bag_items = useSelector(state => state.bag.bag_items)

     let order_total_arr = bag_items ? bag_items.map(item => item.quantity * item.price) : []
     // let order_total = order_total_arr.reduce((acc, cur) => acc + cur)
     return (
          <div>
               {
                    bag_items.length > 0 &&
                    <table className='table text-center table-hover mb-4'>
                         <thead>
                              <tr>
                                   <th>Food Name</th>
                                   <th>Food Price</th>
                                   <th>Qty</th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   bag_items.map((item, i) => {
                                        return <tr key={i}>
                                             <td>{item.name}</td>
                                             <td>Rs.{item.price}</td>
                                             <td>{item.quantity}</td>
                                        </tr>

                                   })
                              }
                         </tbody>
                    </table>
               }
               {
                    order_total_arr.length > 0 ?
                         <div className='fs-5 text-success'>
                              <h5>DELIVERY CHARGE: RS.100</h5>
                              <h5>GRAND TOTAL:{order_total_arr.reduce((acc, cur) => acc + cur)}</h5>
                              <Link to='/confirmorder' className='btn btn-warning my-3'>Proceed to Checkout</Link>
                         </div>:
                         <div>
                              (Your bag is empty.)
                         </div>
               }
               
          </div>
     )
}
