import React,{useEffect,useState} from 'react'
import BasicLayout from '../layouts/BasicLayout'
import {obtenersolomisfavorites} from '../api/favorite'
import useAuth from '../hooks/useAuth'
import cartAuth from '../hooks/cartAuth'

const misfavoritos = () => {

    const [mostrarProducto,setMostrarProducto] = useState(null)

    const {auth,logout} = useAuth()

    console.log(cartAuth())

    useEffect(() => {
    
        (async()=> {

            const resolve = await obtenersolomisfavorites(auth.idUser,logout)
            setMostrarProducto(resolve)

        })()

    }, [])
    
    console.log(mostrarProducto)

  return (
    <BasicLayout>

 <div className='misfavoritos'><h1>
 En proceso

    </h1></div>

    </BasicLayout>
   
  )
}

export default misfavoritos