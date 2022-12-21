import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { findCategory, deleteCategory } from '../../../api/categoryAPI'
import { isAuthenticated } from '../../../api/userAPI'
import AdminSidebar from '../AdminSidebar'



const DeleteCategory = () => {
    const [category, setCategory] = useState([])
    const { id } = useParams()
    const { token } = isAuthenticated()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        findCategory(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategory(data)
                }
            })
    }, [])

    const handleDelete = (e) => {
        e.preventDefault()
        deleteCategory(id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(data.message)
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
                    <AdminSidebar category />
                </div>
                <div className='col-md-9 p-5 text-start'>
                    <div className='d-flex justify-content-between w-75'>
                        <h3>
                            Category Delete
                        </h3>
                        <Link to='/admin/category' className='btn btn-primary'>Go Back</Link>

                    </div>
                    <form className='w-50 m-5 p-5 shadow'>
                        {showError()}
                        <label htmlFor='category'>Category Name</label>
                        <input type={'text'} readOnly value={category.category_name} className='form-control mb-3' />
                        {
                            !success ? <>
                                <p>Are you sure you want to delete this category? </p>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Category</button>
                            </>
                                :
                                showSuccess()
                        }
                    </form>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default DeleteCategory