import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/Index'
import Dev from './pages/Dev'

import './index.css'
import "@fontsource/ibm-plex-sans-thai"
import "@fontsource/ibm-plex-sans-thai-looped"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Movie from './pages/Movie'
import Navbar from './components/Navbar'
import Reservation from './pages/Reservation'
import Confirm from './pages/Confirm'
import Summary from './pages/Summary'
import Login from './pages/Login'
import TicketValidation from './pages/TicketValidation'

// Mock in DEV environment only!
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/worker")
  worker.start()

}

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
  },
  {
    path: '/movie/summary',
    element: <Summary />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/validate-ticket/:ticketId',
    element: <TicketValidation />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
