import React,{useEffect,useState} from 'react'
import {Grid,Button,Icon} from 'semantic-ui-react'
import  {map,size} from 'lodash'
import Link from 'next/link'
import { encontrarlosAtodos } from '../../api/direcions'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import PagoConEstripe from './Paymen/PagoConEstripe'


const DireccionDeEnvio = ({todoslosProductos,totalPrecio}) => {

    const [guardarDireccion,setGuardarDireccion] = useState(null)
    const [direccion,setDireccion] = useState(null)
    const [activedireccion,setActivedireccion] = useState(false)
   const {auth,logout} = useAuth();
   const router = useRouter()



    useEffect(() => {
   
        ( async ()=> {

            const response = await encontrarlosAtodos(auth.idUser,logout)
            setDireccion(response?.data || [])

        })()

    }, [])

console.log(guardarDireccion)

    const guardarDirecciones = (e) => {
console.log(e)
        const datos  = {
            codigopostal :e.target.previousElementSibling.childNodes[0].firstChild.nodeValue ,
            direccion : e.target.previousElementSibling.childNodes[3].firstChild.nodeValue,
            telefono : e.target.previousElementSibling.childNodes[2].firstChild.nodeValue,
            users_permissions_user : auth.idUser
            
        }

        setGuardarDireccion(datos)
        setActivedireccion(true)

    }


    

  return (
      <>
    <div className='direccion-envio'>
        
    
    {!direccion && <h1 style={{textAling:'center'}}><Icon name='address card' > </Icon>No tienes direccioones</h1>}
{direccion && direccion.length === 0 && (
<div style={{width:'100%'}}>


<h1 style={{textAling:'center'}}><Icon name='address card' > </Icon>no tienes direcciones</h1>
<Button className='obtenerdireccion'  onClick={()=>router.push('/account')}>Crear Direcion</Button>
</div>
) }
    {direccion && direccion.map((direccio,i)=>{
        const {attributes} = direccio
        return (
<div className={ guardarDireccion === attributes.direccion  ? 'direccion black' : 'direccion '} key={i}>
   <div className='todaslasp'><p>{attributes.codigopostal}</p>
    <p>{attributes.nombredeusuario}</p>
    <p>{attributes.telefono}</p>
    <p>{attributes.direccion}</p></div> 
    { guardarDireccion === attributes.direccion  ? <h4>Seleccionado</h4>: <Button onClick={guardarDirecciones}> Seleccionar</Button>} 
</div>
        )
    })  }

    </div>

    {guardarDireccion &&  <PagoConEstripe guardarDireccion={guardarDireccion} todoslosProductos={todoslosProductos} totalPrecio={totalPrecio}/>}
    </>

    
  )
}

export default DireccionDeEnvio

