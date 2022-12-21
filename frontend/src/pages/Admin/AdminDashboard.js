import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import AdminSidebar from './AdminSidebar'

const AdminDashboard = () => {
  return (
    <>
        <Navbar/>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminSidebar/>
                </div>
                <div className='col-md-9'>
                </div>
            </div>
        <Footer/>
    </>
  )
}

export default AdminDashboard