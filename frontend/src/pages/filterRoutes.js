import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../api/userAPI'


export const AdminRoutes = () => {
     return (
          isAuthenticated() && isAuthenticated().user.role === 1 ? <Outlet /> : <Navigate to='/login' />
     )
}

export const UserRoutes = () => {
     return (
          isAuthenticated() && isAuthenticated().user.role === 0 ? <Outlet /> : <Navigate to='/login' />
     )
}
