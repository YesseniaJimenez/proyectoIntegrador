import React, { useContext } from 'react'
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { ContextLogin } from '../Context/LoginContext'


const ProtectedRoutes = () => {
    const { state } = useContext(ContextLogin)
    const location = useLocation()

    const userRoutes = ["/reservations"]

    const isUserPermited = userRoutes.includes(location.pathname)
    
    if (state.isAdmin || isUserPermited) {
        return <Outlet /> 
    }
    else {
        return <Navigate to="/home" />
    }
}

export default ProtectedRoutes