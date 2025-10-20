import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-emerald-500 h-15 flex items-center justify-between shadow-2xl rounded-b-xl fixed w-full z-50'>
            <h1 className='text-3xl font-serif text-white ml-3'>Appointment Manager</h1>
            <div className=' w-100 flex justify-around text-xl text-white font-serif'>
            <a>My Appointments</a>  
            <a>Login</a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar