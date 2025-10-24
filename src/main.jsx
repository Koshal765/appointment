import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Appointment from './Appointment.jsx'
import MyAppointments from './MyAppointments.jsx'
import Login from './Login.jsx'



const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[{
      index:true,
      element:<Appointment/>
    },
    {
      path:'/login',
      element:<Login/>
    },
  {
    path:'/my-appointments',
    element:<MyAppointments/>
  }

  ]
  }
])
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
