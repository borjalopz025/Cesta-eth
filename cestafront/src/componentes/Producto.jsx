import React from 'react'
import {useQuery} from 'react-query'
import { Link } from 'react-router-dom'

export const Producto = () => {
  const {data, isLoading} = useQuery("producto" , () => {
    return fetch("http://localhost:555/producto").then(res => res.json())
  })

  if (isLoading) {
    return <h1>Cargando...</h1>
  }
    
  return (
    <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
              {
                data.map(pro =>(
                  <tr key={pro.ProductID}>
                    <td><Link to={`/producto/${pro.ProductID}`}>{pro.ProductName}</Link></td>
                  </tr>
                ))
              }
          </tbody>
        </table>
    </div>
  )  
}
