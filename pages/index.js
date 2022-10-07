import Head from 'next/head'
import BasicLayout from '../layouts/BasicLayout'
import { mostrarProductos } from '../api/productos'
import{useEffect,useState} from 'react'
import { Grid , Loader,Image } from 'semantic-ui-react'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'

//por si quieres hacer responsi desde javascript y no desde css normal
// import useWindowSize from '../hooks/useWindowSize'
// import { breakPointupsm,breakPointupMd,breakPointupLg } from '../utils/breakPoins'

export default function Home() {

  const [todoslosProductos,setTodoslosProductos] = useState(null)

  useEffect(() => {
    
    ( async ()=>{
const resolve =  await mostrarProductos(30)
setTodoslosProductos(resolve?.data || [])
    })()
    
  }, [])


  //responsive design with javascript
//   const {width} = useWindowSize();

//   const obtenerresoluciones = () => {

//     switch(true){
// //si no hay return se utiliza breack; para parar la ejecucion
//       case width > breakpointuplg:
//         return 5
//         case width >  breakpointumd :
//           return 3;
          
//           case width > breakpoinupsm : 
//           return 2;

//           default: return 1;

//     }

//   }

  const nuevoproducto = todoslosProductos?.map(todoslosProducto=>{

    const { attributes,id } = todoslosProducto
    return(
    
    <Grid.Row className='editartamaño'  columns={5} key={id}  mobile={4} tablet={4} computer={4}>
    
    <div className='todoslosdatosreunidos'>
    <Link href={`/${attributes.url}/`}>
        <a>

        <h2>{attributes.title}</h2>
        <Image src={attributes.poster.data.attributes.url} alt={attributes.title}/>
        <p className='descripcion'>{attributes.descripcion}</p>
        <p>El precio es: <span style={{fontWeight:'bold',color:'black'}}>  {attributes.precio}</span> </p>
       {attributes.descuento ? <p className='descuento'>-{attributes.descuento}</p> : null } 
        <Button>Ver ahora</Button>
        

        </a>
      </Link>
    
    </div>
    
    
    </Grid.Row>
    
    )})
  

 return (
    <BasicLayout>
     <Grid className='home'>

{!todoslosProductos && <Loader active>Cargando el juego</Loader>}
{todoslosProductos && todoslosProductos.length === 0 && (
<div>
  no hay juegos
</div>
) }
{todoslosProductos && nuevoproducto} 

     </Grid>
    </BasicLayout>
  )
}
