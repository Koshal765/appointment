import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar'
import Appointment from './Appointment'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
