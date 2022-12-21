import React, { useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import AdminSidebar from '../AdminSidebar'
import { Link, useParams } from 'react-router-dom'
import { deleteUser,isAuthenticated } from '../../../api/userAPI'


const DeleteUser = () => {
     const { userId } = useParams()
     const {token } = isAuthenticated()
     const [error, setError] = useState('')
     const [success, setSuccess] = useState('')
     
    
     const handleDeleteChange = e => {
          e.preventDefault()
          deleteUser(userId, token)
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
                         <AdminSidebar users />
                    </div>
                    <div className='col-md-9 p-5 text-start'>
                         <div className='d-flex justify-content-between w-75 mb-5'>
                              <h3>
                                  Delete User
                              </h3>
                              <Link to='/admin/users' className='btn btn-primary'>GO BACK</Link>

                         </div>
                         <div className='container d-flex shadow-sm '>
                              <div className='p-5 my-5 text-center'>
                                   {showError()}
                                   {
                                        success ? showSuccess() :
                                             <>
                                                  <p >Are you sure you want to delete this user?</p>
                                                  <button className='btn btn-danger' onClick={handleDeleteChange}>Delete User</button>
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


export default DeleteUser