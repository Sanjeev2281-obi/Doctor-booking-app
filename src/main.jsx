import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctor'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import AppContextProvider from './context/AppContext.jsx'
import Appointment from './pages/Appointment.jsx'
import './index.css'
import Footer from './components/Footer.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/doctors/:speciality', element: <Doctors /> },
      { path: '/login', element: <Login /> },
      { path: '/my-profile', element: <MyProfile /> },
      { path: '/my-appointment', element: <MyAppointment /> },
      { path: '/my-appointment/:docId', element: <Appointment /> },
     
    ],
    
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
    <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
)
