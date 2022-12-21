import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { findCategory, updateCategory } from '../../../api/categoryAPI'
import { isAuthenticated } from '../../../api/userAPI'
import AdminSidebar from '../AdminSidebar'


const UpdateCategory = () => {
    const [category, setCategory] = useState([])
    const { id } = useParams()
    const { token } = isAuthenticated()
    const [new_category, setNewCategory] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

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
    }, [success])

    const handleUpdate = (e) => {
        e.preventDefault()
        updateCategory(id, new_category, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(true)
                }
            })
    }
    const showError = () => {
        if (error) {
            return <div classname='alert alert-danger'>{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>Category updated Successfully.</div>
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
                            Category Update
                        </h3>
                        <Link to='/admin/category' className='btn btn-primary'>Go Back</Link>

                    </div>
                    <form className='w-50 m-5 p-5 shadow'>
                        {showError()}
                        <label htmlFor='category'>Category Name</label>
                        <input type={'text'} readOnly value={category.category_name} className='form-control mb-3' />

                        {
                            success ? showSuccess() :
                                <>
                                    <label htmlFor='newCategory'>New Category Name:</label>
                                    <input type={'text'} onChange={e => setNewCategory(e.target.value)} className='form-control' />

                                    <button className='btn btn-warning mt-2' onClick={handleUpdate}>Update Category</button>
                                </>
                        }

                    </form>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default UpdateCategory