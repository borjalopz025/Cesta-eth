import React, { useContext } from 'react'
import {useQuery} from 'react-query'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import {context } from '../main'



export const Pro = () => {

  const params = useParams();

  const [estado ,setEstado] = useContext(context)

  const cantidad = estado.cesta.find(i => i.producto.ProductID == params.id)?.cantidad

  const {register, handleSubmit} = useForm(
    {
        defaultValues: {cantidad: cantidad}
    }
    );

  const {data, isLoading} = useQuery("producto" , async () => {
    const res = await fetch(`http://localhost:555/producto/${params.id}`)
      return await res.json()
  })

  function onSubmit(datos) {
    console.log(datos);
    setEstado({
        ...estado,cesta: [...estado.cesta.filter(i => i.producto.ProductID != data[0].ProductID),
        {
            producto: data[0],
            cantidad: datos.cantidad,
            total: datos.cantidad * data[0].UnitPrice
        }]
    })
  }

  return (
    <div>
      <h3>Producto</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <td>{data[0].ProductID}</td>
          </tr>
          <tr>
            <th>Nombre</th>
            <td>{data[0].ProductName}</td>
          </tr>
          <tr>
            <th>Precio</th>
            <td>{data[0].UnitPrice} eth</td>
          </tr>
        </thead>
      </table>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label>Introduzca la cantidad</label>
            <input {...register("cantidad")} type="number" className='form-control' />
        </div>
        <button className='btn-primary mt-3'>Añadir al carrito</button>
      </form>
      <div>
        {JSON.stringify(estado)}
      </div>
    </div>
  )
}
