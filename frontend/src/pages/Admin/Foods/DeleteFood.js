import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../config'
import { isAuthenticated } from '../../../api/userAPI'
import { deleteFood, viewfoodDetails } from '../../../api/foodAPI'
import AdminSidebar from '../AdminSidebar'


const DeleteFood = () => {
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

    const handleDeleteChange = e => {
        e.preventDefault()
        deleteFood(foodId, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(data.message)
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
                    <div className='d-flex justify-content-between w-75 mb-5'>
                        <h3>
                            Delete Food Item
                        </h3>
                        <Link to='/admin/foods' className='btn btn-primary'>GO BACK</Link>

                    </div>
                    <div className='container d-flex shadow'>
                        <div className='p-5 my-5 border-end border-3 text-center'>
                            <h2 className='text-center text-decoration-underline'>food Details</h2>
                            <hr className='my-3'></hr>
                            <img src={`${API}/${food_image}`} alt={food_name} style={{ height: "320px" }} />
                            <h3>food Name: <u>{food_name}</u></h3>
                            <h3>Price: <u>Rs. {food_price}</u></h3>
                            <h3>Description: <u>{food_description}</u></h3>

                        </div>
                        <div className='p-5 my-5 border-end border-3 text-center'>
                            {showError()}
                            {
                                success ? showSuccess() :
                                    <>
                                        <p >Are you sure you want to delete this food item? </p>
                                        <button className='btn btn-danger' onClick={handleDeleteChange}>Delete food Item</button>
                                    </>
                            }
                        </div>

                    </div>


                </div>
            </div>

            <Footer />
        </>
    )
}


export default DeleteFood