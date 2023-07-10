import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='layout'>
            <Navbar />
            <Outlet />
            <Footer /> 
        </div>
    )
}

export default Layout