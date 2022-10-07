import BasicLayout from '../layouts/BasicLayout'
import { mostrarProductos } from '../api/productos'
import{useEffect,useState} from 'react'
import { Grid , Icon,Image } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import cartAuth from '../hooks/cartAuth'
import {getGameByUrlAppi} from '../api/productos'
import {forEach} from 'lodash'
import DireccionDeEnvio from '../components/Cart/DireccionDeEnvio'

const carrito = () => {

    const [todoslosProductos,setTodoslosProductos] = useState(null)
    const [totalPrecio,setTotalPrecio] = useState(0);
    const [eliminarProducto,setEliminarProducto] = useState(false)

    const {getProductsCart,removeProductCart} = cartAuth()
    const todosLosProductoss = getProductsCart()


  useEffect(() => {
      
    ( async ()=>{
      const productTemp = [];
      if(todosLosProductoss){

        for await (const product of  todosLosProductoss){
        
          const resolve =  await getGameByUrlAppi(product)
  productTemp.push(resolve)
  
        }
  
        setTodoslosProductos(productTemp)


      }else{
        null
      }
  setEliminarProducto(false)

    })()
    
  }, [eliminarProducto])

  const eliminarElProducto = (e) => {

    console.log(e.target.parentElement.id)
    removeProductCart(e.target.parentElement.id)
    setEliminarProducto(true)

  }



  useEffect(() => {
    let price = 0;
    forEach(todoslosProductos, (product) => {
      price += product.attributes.precio;
    });
    setTotalPrecio(price);
  }, [todoslosProductos,totalPrecio]);

const nuevoproducto = todoslosProductos?.map(todoslosProducto=>{

    const { attributes,id } = todoslosProducto
    return(
    
    <Grid.Row className='editartamaño'  columns={5} key={id}  mobile={4} tablet={4} computer={5}>
    
    <div className='todoslosdatosreunidos todoslosdatosreunidosdelcarro' id={attributes.url}>


        <h2>{attributes.title}</h2>
        <Image src={attributes.poster.data.attributes.url} alt={attributes.title}/>
        <p>El precio es: <span style={{fontWeight:'bold',color:'black'}}>  {attributes.precio}</span> </p>
       {attributes.descuento ? <p className='descuento'>-{attributes.descuento}</p> : null } 
        <Button onClick={eliminarElProducto}>Eliminar Del Carrito</Button>
        
    
    </div>
    
    
    </Grid.Row>
    
    )})


//render componente
  return (
      <BasicLayout>

<Grid className='home estanoeslahome'>

{!todoslosProductos && <h1 style={{textAling:'center'}}><Icon name='cart arrow down' > </Icon>El Carrito Esta vacio</h1>}
{todoslosProductos && todoslosProductos.length === 0 && (
<div style={{width:'100%'}}>


<h1 style={{textAling:'center'}}><Icon name='cart arrow down' > </Icon>El Carrito Esta vacio</h1>
</div>
) }
<div className='organizarvalor'>
<Button className='botoncomprar'>Pagar ya!</Button>
<p>valor a Pagar : {totalPrecio.toFixed(2)}$</p>
</div>
{todoslosProductos && nuevoproducto} 

 </Grid>
 <div className='direccionesorganizadas'>
 <h2>Direccion De Envio</h2>
<DireccionDeEnvio todoslosProductos={todoslosProductos}  totalPrecio={totalPrecio}/>
 </div>

      </BasicLayout>
  )
}

export default carrito