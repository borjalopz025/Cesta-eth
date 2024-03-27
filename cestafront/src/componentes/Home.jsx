import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='container'>
        <div className='text-end border p-2 mb-2'>
          <Link to={"/producto"} className="me-4">Producto</Link>
          <Link to={"/cesta"}>Cesta</Link>
        </div>
        <div className='p-3 border'>
            <Outlet></Outlet>
        </div>
    </div>
  )
}
