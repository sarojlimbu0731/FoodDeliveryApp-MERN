import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../config'
import { Link } from 'react-router-dom'
import { addToBag, removeFromBag } from '../redux/actions/bagActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Bag = () => {
  const bag_items = useSelector(state => state.bag.bag_items)
  const dispatch = useDispatch()

  const reduceitemfromBag = (id, quantity) => e => {
    e.preventDefault()
    quantity--
    if (quantity <= 0) {
      dispatch(removeFromBag(id))
      toast.error("Food removed from bag")
      return
    }
    dispatch(addToBag(id, quantity))
    toast.success("Food item decreased")
  }

  const increaseitemfromBag = (id, quantity) => e => {
    e.preventDefault()
    quantity++
    dispatch(addToBag(id, quantity))
    toast.success("Food item increased")
  }

  const removeitemfromBag = (id) => e => {
    e.preventDefault()
    dispatch(removeFromBag(id))
    toast.error("Food removed from bag")

  }

  return (
    <>
      <Navbar />
      <ToastContainer position='top-right' autoClose={1000} />
      <div style={{backgroundColor:"#dcdcdc"}}>
      <div className='container mx-auto p-5 w-75'>
        <Link className='text-success fs-4 d-flex justify-content-end mb-2' to='/'>Add more items</Link>
        {
          bag_items.length > 0 ?
            <table className='table text-center table-hover table-bordered table-striped shadow'>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Food Image</th>
                  <th>Food Name</th>
                  <th>Food Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  bag_items.map((item, i) => {
                    return <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={`${API}/${item.image}`} style={{ height: "50px" }} />
                      </td>
                      <td>{item.name}</td>
                      <td>Rs.{item.price}</td>
                      <td>
                        <div className='btn-group'>
                          <button className='btn btn-outline-warning' onClick={reduceitemfromBag(item.food, item.quantity)}>-</button>
                          <div className='px-3'>{item.quantity}</div>
                          <button className='btn btn-outline-success' onClick={increaseitemfromBag(item.food, item.quantity)}>+</button>
                        </div>
                      </td>
                      <td><button className='btn btn-outline-danger' onClick={removeitemfromBag(item.food)}><i className='bi bi-trash'></i></button></td>
                    </tr>

                  })
                }
                <tr>
                  <td colSpan={6}><Link to='/confirmorder' className='btn btn-warning'>Proceed to Checkout</Link></td>
                </tr>

              </tbody>
            </table>

            :
            <div className='alert alert-danger'>Your Bag is Empty</div>

        }
      </div>
      </div>
      <Footer />
    </>
  )
}

export default Bag