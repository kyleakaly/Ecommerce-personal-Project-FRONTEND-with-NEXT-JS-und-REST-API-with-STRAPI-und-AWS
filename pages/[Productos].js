import React ,{useState,useEffect}from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { Grid } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { getGameByUrlAppi } from '../api/productos'
import { Image,Loader,Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'
import InformacionProductoTabs from '../components/informacionadicion/InformacionProductoTabs'
import { obtenerSiUnUsiarioDioFavorito, crearUnFavorito,eliminarElFavorito } from '../api/favorite'
import useAuth from '../hooks/useAuth'
import cartAuth from '../hooks/cartAuth'
import { obtenerProDuctos } from '../api/cart';



import BasicModal from '../components/Modal/BasicModal'

const Productos = () => {

    const [obtenerJuegos,setObtenerJuegos] = useState(null)
    const [obtenerIdJuegos,setObtenerIdJuegos] = useState(null)
    const [show,setShow]  = useState(false)
    const[obtenerimagencarrusel,setObtenerimagencarrucel] = useState(null)
    const [isFavorite,setIsFavorite] = useState(false)


    const router = useRouter()
    const {query} = router

  const { logout ,auth} = useAuth();
  const {addProductCart  } = cartAuth()




    useEffect(() => {
    ( async ()=>{

     
        const resolve = await getGameByUrlAppi(query.Productos)
        setObtenerJuegos(resolve.attributes)
        setObtenerIdJuegos(resolve.id)

    })()

    }, [query])


    useEffect(()=>{

        ( async()=>{

    if(auth){

        const resolve = await  obtenerSiUnUsiarioDioFavorito(auth.idUser, obtenerIdJuegos,logout)
     if(resolve.data.length > 0){
        setIsFavorite(true)
        console.log('ya tienes un like')
      


     }else{
        setIsFavorite(false)
        console.log('no tienes un like')


     }

    }else{
        return null
    }

        })()

    },[obtenerIdJuegos,isFavorite])


    const añadirUnNuevoFavorito = async () => {
        if(auth){
   await crearUnFavorito(auth.idUser, obtenerIdJuegos,logout)
   setIsFavorite(true)

   console.log('hola')
        }

    }

    const eliminarUnFavorito = async () => {
        if(auth){
         await eliminarElFavorito(auth.idUser,obtenerIdJuegos,logout)
        console.log('hola')}
   setIsFavorite(false)

    }

    const obtenermodalehinfirmacion = (e) =>{
        setObtenerimagencarrucel(e.target.src)
        setShow(true)
    
    }

   

if(!obtenerJuegos){
    return  null
}

const {url} = obtenerJuegos

  return (
      <BasicLayout>


  <Grid.Row className='editartamano'  columns={5} mobile={4} tablet={4} computer={4}>



<div className='paginadejuegos'> 
{!obtenerJuegos ? <Loader active>Cargando el juego</Loader> : (
<>
<div className='textoytitulo'>
    <Link href={`/entretenimiento/${obtenerJuegos.modolectura.data.attributes.url}`}>
    <a>
<p> {obtenerJuegos.modolectura.data.attributes.title} </p>
    </a>
    </Link>
<h1> {obtenerJuegos.title }</h1>
</div>

<div className='organizarlosjuegos'> 

<Image src={ obtenerJuegos.poster.data.attributes.url } style={{width:'400px',height:'400px', objectFit: 'cover',objectPosition: ' center  left'}}  alt={obtenerJuegos.title}/>
<div className='organizartexto'>
    <h3 className='descripcionproducto'>descripcion</h3>
     <p className='descripcionjuego' dangerouslySetInnerHTML={{__html: obtenerJuegos.descripcion}}/>
<p className='precio'>El Precio es: <span style={{fontWeigth:'bold', fontSize:'22px'}}> {obtenerJuegos.precio}  </span> </p>
<div className='favoritos'>Favoritos {!isFavorite ? (< Icon name='heart outline' onClick={añadirUnNuevoFavorito}/>) : (< Icon name='heart' onClick={eliminarUnFavorito}/>)} </div>
{obtenerJuegos.descuento ? <p className='descuento'>-{obtenerJuegos.descuento}</p> : null } 
{obtenerJuegos.descuento ? <p className='condescuento'>price total-{obtenerJuegos.precio * obtenerJuegos.descuento / 100}</p> : null } 
{!obtenerProDuctos()?.includes(obtenerJuegos.url) ? <Button className='arreglarboton' onClick={()=> addProductCart(url)}>Añadir Al Carro</Button> : <Button className='arreglarboton' onClick={()=>router.push('/carrito')}>ir A pagar</Button> }
<div className='minigaleria'>
    <h3>Galeria de Imagenes</h3>
     <div className='organizartodo'>
    {obtenerJuegos.galerias.data.map(imagenes=>{
const { attributes,id } = imagenes
return (
    <div  key={id}>
    <Image src={attributes.url}  alt={'galeria'}  onClick={obtenermodalehinfirmacion}/>
    </div>

)
 })}
</div>
</div>

<BasicModal show={show} setShow={setShow} title={'Mas Imagenes'}>
    <Image src={obtenerimagencarrusel} alt='ca'/>
</BasicModal>

 </div>

</div>


</>


)
}

<InformacionProductoTabs obtenerJuegos={obtenerJuegos}/>

</div>



</Grid.Row> 

</BasicLayout>
  )
}

export default Productos

