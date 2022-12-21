import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../../api/userAPI'
import {TfiDashboard} from 'react-icons/tfi';
import {IoFastFood} from 'react-icons/io5';



const AdminSidebar = ({ category, foods, users, orders }) => {
    const { user } = isAuthenticated()
    const [error, setError] = useState('')
    const navigate = useNavigate()

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
            {showError()}
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "280px" }}>

                <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <TfiDashboard className='me-2 fs-4'/><span className="fs-4">Dashboard</span> 
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto text-start">
                    <li>
                        {
                            orders ?
                                <Link to="/admin/orders" className="nav-link link-dark active text-white">
                                    <i className='bi bi-table me-2'></i>
                                    Orders
                                </Link>
                                :
                                <Link to="/admin/orders" className="nav-link link-dark">
                                    <i className='bi bi-table me-2'></i>
                                    Orders
                                </Link>
                        }
                    </li>
                    <li>
                        {
                            users ?
                                <Link to="/admin/users" className="nav-link link-dark  active text-white">
                                    <i className='bi bi-person-circle me-2'></i>
                                    Users
                                </Link>
                                :
                                <Link to="/admin/users" className="nav-link link-dark">
                                    <i className='bi bi-person-circle me-2'></i>
                                    Users
                                </Link>
                        }
                    </li>

                    <li>
                        {
                            category ?
                                <Link to="/admin/category" className="nav-link link-dark active text-white">
                                    <i className="bi bi-tags me-2"></i>
                                    Categories
                                </Link>
                                :
                                <Link to="/admin/category" className="nav-link link-dark">
                                    <i className="bi bi-tags me-2"></i>
                                    Categories
                                </Link>
                        }
                    </li>
                    <li>
                        {
                            foods ?
                                <Link to="/admin/foods" className="nav-link link-dark active text-white">
                                    <IoFastFood className='me-2'/>
                                    Foods
                                </Link> :
                                <Link to="/admin/foods" className="nav-link link-dark">
                                    <IoFastFood className='me-2'/>
                                    Foods
                                </Link>
                        }
                    </li>

                </ul>
                <hr />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://static.vecteezy.com/system/resources/previews/004/274/186/original/person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vector.jpg" alt="" width="32" height="32" className="rounded-circle me-2 mt-2" />
                        <strong>{user.username}</strong>
                    </Link>
                    <ul className="dropdown-menu text-small shadow">
                        <li><span className="dropdown-item">{user.email}</span></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#" onClick={handleSignout}>Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar