import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../api/userAPI'
import {GiHamburger } from 'react-icons/gi';



const Navbar = () => {
  const navigate = useNavigate()
  const { user } = isAuthenticated()
  const [error, setError] = useState('')

  const handleSignout = e => {
    e.preventDefault()
    signout()
      .then(data => {
        if (data.error) {
          setError(data.error)
        }
        else {
          localStorage.removeItem('jwt')
          console.log("signed out successfully.")
          navigate('/')
        }
      })
  }
  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }

  return (
    <>
      <div className='row text-white py-3 shadow'>
        <div className='col-8 text-align-left d-flex align-content-start px-5'>
          <Link className="navbar-brand fs-2 fw-bold" to="/" style={{color:"#FF6700"}}><GiHamburger className='fs-1 me-2 text-warning'/>Burger House</Link>
        </div>
    
        <div className='col-4 d-flex justify-content-end'>
          {
            !user &&
            <>
              <Link to='/register'><i className="bi bi-person-plus fs-3 me-3" style={{color:"#FF6700"}}></i></Link>
              <Link to='/login'><i className="bi bi-box-arrow-in-left fs-3 me-3" style={{color:"#FF6700"}}></i></Link>
            </>
          }
          {
            user && user.role === 0 &&
            <>
              <Link to='/user/profile'><i className='bi bi-person-circle fs-3 me-3' style={{color:"#FF6700"}}></i></Link>
              <Link to='/bag'><i className="bi bi-bag-check fs-3 me-3"  style={{color:"#FF6700"}}></i></Link>
            </>
          }
          {
            user && user.role === 1 &&
            <Link to='/admin/orders'><i className='bi bi-speedometer fs-3 me-4' style={{color:"#FF6700"}}></i></Link>
          }
          {
            user &&
            <Link to='/' onClick={handleSignout}><i className='bi bi-box-arrow-right fs-3 me-4' style={{color:"#FF6700"}}></i></Link>
          }

        </div>
      </div>
      {showError()}
    </>
  )
}

export default Navbar