import React, { useEffect, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { searchProducto } from '../api/productos'
import { useRouter } from 'next/router'
import { Loader ,Grid,Button,Image} from 'semantic-ui-react'
import Link from 'next/link'


const search = () => {


    const [datosdelusuario, setDatosDelUsuario] = useState(null)
    const router = useRouter()
    const { query: { query } } = router

    useEffect(() => {

        document.getElementById('search-manga').focus();

    }, [])

    useEffect(() => {

        
        (async () => {
            if(query){
                const resolve = await searchProducto(query)
                setDatosDelUsuario(resolve)
            }else{
                setDatosDelUsuario(null)
            }
         

        })()

    }, [query])

    
const nuevoarray = datosdelusuario?.data.map(obtenerJuegoss=>{
const {attributes,id} = obtenerJuegoss

return (

    

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

)

})


    return (
        <BasicLayout className="search">

<Grid className='home'>

{!nuevoarray && <Loader active> Escribe algo para buscar </Loader>}
{nuevoarray && nuevoarray.length === 0 && (
<div>
  no hay juegos
</div>
) }
{nuevoarray && nuevoarray} 

     </Grid>


        </BasicLayout>

    )
}

export default search