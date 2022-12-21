import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { getCategories } from '../../../api/categoryAPI'
import AdminSidebar from '../AdminSidebar'


const Category = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
    }, [])

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
                            Category
                        </h3>
                        <Link to='/admin/category/add' className='btn btn-primary'>Add Category</Link>

                    </div>
                    <table className='table table-hover table-striped text-center p-3 m-5 shadow w-75'>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((category, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            {category.category_name}
                                        </td>
                                        <td>
                                            <div className='btn-group'>
                                                <Link to={`/admin/category/update/${category._id}`} className='btn btn-warning'><i className='bi bi-pencil'></i></Link>
                                                <Link to={`/admin/category/delete/${category._id}`} className='btn btn-danger'><i className='bi bi-trash'></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default Category