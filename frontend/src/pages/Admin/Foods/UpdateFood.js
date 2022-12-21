import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { API } from '../../../config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updateFood, viewfoodDetails } from '../../../api/foodAPI'
import { isAuthenticated } from '../../../api/userAPI'
import AdminSidebar from '../AdminSidebar'


const UpdateFood = () => {
    const [food, setfood] = useState({
        food_name: '',
        food_price: '',
        food_description: '',
        food_image: ''
    })
    const { food_name, food_price, food_description, food_image } = food
    const { foodId } = useParams()
    const { token } = isAuthenticated()
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        viewfoodDetails(foodId)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setfood(data)
                }
            })
            .catch(error => console.log(error))
    }, [])

    const handleChange = name => e => {
        e.preventDefault()
        setfood({ ...food, [name]: e.target.value })
    }

    const handleUpdate = e => {
        e.preventDefault()
        updateFood(foodId, food, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess("food updated Successfully")
                    navigate('/admin/foods')
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>{success}</div>
        }
    }
    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col-md-3'>
                    <AdminSidebar foods />
                </div>
                <div className='col-md-9 p-5 text-start'>
                    <div className='d-flex justify-content-between w-75'>
                        <h3>
                            Update Food Item
                        </h3>
                        <Link to='/admin/foods' className='btn btn-primary'>Go Back</Link>

                    </div>
                    <div className='container d-flex shadow'>
                        <div className='p-5 my-5 border-end border-3 text-center'>
                            <h2 className='text-center text-decoration-underline'>Food Details</h2>
                            <hr className='my-3'></hr>
                            <img src={`${API}/${food_image}`} alt={food_name} style={{ height: "300px" }} />
                            <h3>Food Name: <u>{food_name}</u></h3>
                            <h3>Price: <u>Rs. {food_price}</u></h3>
                            <h3>Description: {food_description}</h3>
                        </div>
                        <form className='w-50 mx-auto p-5 my-5'>
                            {showError()}
                            <h2 className='text-decoration-underline mb-3'>Update Information</h2>
                            <hr className='my-3'></hr>
                            <label htmlFor='name'>Food Name</label>
                            <input type={'text'} id='name' className='form-control mb-3' onChange={handleChange('food_name')} value={food_name} />
                            <label htmlFor='price'>Food Price</label>
                            <input type={'text'} id='price' value={food_price} className='form-control mb-3' onChange={handleChange('food_price')} />
                            <label htmlFor='desc'>Description</label>
                            <textarea id='desc' className='form-control mb-3' value={food_description} onChange={handleChange('food_description')} />
                            {
                                !success ?
                                    <button className='btn btn-warning mt-3 form-control' onClick={handleUpdate}>Update food</button>
                                    : showSuccess()
                            }

                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UpdateFood