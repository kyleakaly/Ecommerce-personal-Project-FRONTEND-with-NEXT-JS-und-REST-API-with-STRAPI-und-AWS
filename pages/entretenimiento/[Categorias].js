import React,{useState,useEffect}from 'react'
import BasicLayout from '../../layouts/BasicLayout' 
import { useRouter } from 'next/router'
import { obtenerLaPlataformaLectura ,obtenertotaldejuegos} from '../../api/productos'
import { Grid,Loader,Image,Button } from 'semantic-ui-react'
import Link from 'next/link'
import Pagination from '../../components/Pagination/Pagination'


const Categorias = () => {
  //es como el link pero mejor por que no refresca la pagina router
  const router = useRouter()
  const { query } = router

  const [obtenerLosdatosdeJuegos,setObtenerLosdatosdeJuegos] = useState([])
  const [obtenernumerodelJuegos,setobtenernumerodelJuegos] = useState(null)

  const obtenerelInicio = () => {

    const currentPages = parseInt(query.page);
    if(!query.page || currentPages === 1 ){
      return 0
    }else{
      return currentPages * 10 - 10
    }
    

  }


useEffect(()=>{

  (async()=>{
    if(query.Categorias){
      const resolve = await obtenerLaPlataformaLectura(query.Categorias,10,obtenerelInicio())
      setObtenerLosdatosdeJuegos(resolve?.data || [])
    }
 
  })()

},[query])

useEffect(()=>{

  (async()=>{
    if(query.Categorias){
      const resolve = await obtenertotaldejuegos(query.Categorias)
      setobtenernumerodelJuegos(resolve?.data.length || null)
    
    }
 
  })()

},[query])


const nuevoarray = obtenerLosdatosdeJuegos?.map(obtenerLaPlataformaLectur=>{

  const { attributes,id } = obtenerLaPlataformaLectur
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
    <BasicLayout className='Categorias'>

      <h1>Quieres Comprar: {query.Categorias}</h1>
      <Grid className='home'>

{!nuevoarray && <Loader active>Cargando el juego</Loader>}
{nuevoarray && nuevoarray.length === 0 && (
<div>
  no hay juegos
</div>
) }
{nuevoarray && nuevoarray} 

     </Grid>

{obtenernumerodelJuegos ? <Pagination obtenernumerodelJuegos={obtenernumerodelJuegos} page={query.page ? parseInt(query.page) : 1 } limitperpage={5} />  : null}

    </BasicLayout>
  
  )
}

export default Categorias