import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/Index'
import Dev from './pages/Dev'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Movie from './pages/Movie'

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
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
