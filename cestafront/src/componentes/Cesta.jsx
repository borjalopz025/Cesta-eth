import React, { useContext, useEffect, useState } from 'react'
import {context} from '../main'
import { ethers } from 'ethers'

export const Cesta = () => {

    const [estado, setEstado] = useContext(context);

    const [cuenta, setCuenta] = useState(null);

    const [txOk, setTxOk] = useState(null);

    const [txKo, setTxKo] = useState(null);

    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0)

    useEffect(() => {
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(cuentas => {
            setCuenta(cuentas[0])
            ethereum.on("accountsChanged", (cuentas) =>{
                setCuenta(cuentas[0])
            })
        })
    }, [])

    async function pagar() {
        const txParams = {
            to: "0xC60059D3c4Fa9a643c5AE3443D24969e2818f4aD",
            from: cuenta,
            value: ethers.toBeHex(ethers.parseEther(total.toString()))
        }
        try {
            const tx = await ethereum.request({
                method: "eth_sendTransaction",
                params:[ txParams ]
            })
            setTxOk(tx)
            
        } catch (error) {
            setTxKo(error)
            console.log("hay un error en la transaccion");
        }
        console.log(txParams);
    }

    return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody >
                {estado.cesta.map(i =>  (
                    <tr key={i.producto.ProductID}>
                        <td>{i.producto.ProductID}</td>
                        <td>{i.producto.ProductName}</td>
                        <td>{i.producto.UnitPrice}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total: {total}</h3>
        <h4>{cuenta}</h4>
        <button onClick={() => pagar()} className='btn btn-primary'>Pagar</button>
        {txOk && <p className='alert alert-sucess'>{txOk}</p>}
        {txKo && <p>{txKo}</p>}
    </div>
    )
}
