import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isAuthenticated } from '../api/userAPI'
import { API } from '../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToBag } from '../redux/actions/bagActions';


const FoodModal = ({ foodDetail }) => {
     const { user } = isAuthenticated()
     let [qty, setqty] = useState(1);
     const dispatch = useDispatch()

     const addOnCart = () => {
          dispatch(addToBag(foodDetail._id,qty))
          toast.success("food added in bag")
     }

     return (
          <>
                <ToastContainer position='top-right' autoClose={1000} />
               <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered mx-auto">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h1 className="modal-title fs-5" id="staticBackdropLabel">{foodDetail.food_name}</h1>
                                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                   <div className="card">
                                        <img src={`${API}/${foodDetail.food_image}`} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                             <h5 className="card-title text-truncate">{foodDetail.food_name}</h5>
                                             <h6 className="card-title">Rs.{foodDetail.food_price}</h6>
                                             <h6>{foodDetail.food_description}</h6>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-footer row">
                                   <div className='col-6 d-flex'>
                                        {
                                             qty>= 1?
                                             <button className='btn btn-outline-warning rounded' onClick={e=>setqty(--qty)}><i className="bi bi-dash-square"></i></button>:
                                             <button disabled className='btn btn-outline-warning rounded' onClick={e=>setqty(--qty)}><i className="bi bi-dash-square"></i></button>
                                        }
                                        <div className='px-3'>{qty}</div>
                                        <button className='btn btn-outline-success rounded' onClick={e=>setqty(++qty)}><i className="bi bi-plus-circle"></i></button>

                                   </div>
                                   <div className='col-6'>
                                        {user &&user.role===0 &&qty > 0 ?
                                             <button className='btn btn-warning mt-2 w-100' onClick={addOnCart}>Add to bag</button> :
                                             <button className='btn btn-warning mt-2 1-100' disabled onClick={addOnCart}>Add to bag</button>
                                        }

                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default FoodModal