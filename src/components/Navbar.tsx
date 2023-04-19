import { useAtom } from 'jotai'
import React from 'react'
import { authAtom } from '../auth'

const Navbar = () => {
  const [accessToken, setAccessToken] = useAtom(authAtom)
  return (
    <div className="navbar bg-base-200">
      <div className='navbar-start'>
        <a href='/' className="btn btn-ghost normal-case text-xl">Home</a>
      </div>
      <div className='navbar-end'>
        <a className='btn btn-ghost normal-case text-xl' href={accessToken ? '/logout' : '/login'}>{accessToken ? 'Logout' : 'Login to admin system'}</a>
      </div>
    </div>
  )
}

export default Navbar
