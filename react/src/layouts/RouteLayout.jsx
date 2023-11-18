import React from 'react'
import Navbarr from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import './RouteLayout.css'; 


export default function RouteLayout() {
  return (
    <div className='bg'>
    <div className='RouteLayout'>
    <header>
    {!location.pathname.includes('/login') && !location.pathname.includes('/signup') && !location.pathname.includes('/signup/doctor') ?
    <>
    <Navbarr />
    </>
    :
    null
    }
    </header>
    <main>
        <Outlet />
    </main>
    </div>
    </div>
  )
}
