import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/Index'
import Dev from './pages/Dev'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Movie from './pages/Movie'
import Navbar from './components/Navbar'
import Reservation from './pages/Reservation'
import Confirm from './pages/Confirm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/dev',
    element: <Dev />
  },
  {
    path: '/movie',
    element: <Movie />
  },
  {
    path: '/movie/reservation',
    element: <Reservation />
  },
  {
    path: '/movie/confirm',
    element: <Confirm />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
