import {Menu,Icon} from 'semantic-ui-react'
import { useEffect } from 'react'
import { TOKEN } from '../../../../utils/token'
import {useRouter} from 'next/router'
import {toast}  from 'react-toastify'
import Link from 'next/link'
import cartAuth from '../../../../hooks/cartAuth'


const MenuOptions = ({abrirmodal,logout,setAuth,user}) => {

  const router = useRouter();
  const {productsCart} = cartAuth()

  const cerrarsesion = () => {
if(localStorage.getItem('token'))
toast.success('cierre de secion correcto ', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
logout()
setAuth(null)
router.push("/")

  }
    return(
  <Menu >
    {user && (
      <>
     <Link href="/mispedidos">
    <Menu.Item as="a" >
        <Icon name="shopping bag" />
        Mis pedidos
     </Menu.Item>
      </Link>

<Link href="/misfavoritos">
<Menu.Item as="a" >
    <Icon name="star outline" />
    Mis deseos
 </Menu.Item>
  </Link>

  <Link href="/account">
<Menu.Item as="a" >
    <Icon name="user circle outline" />
    Mi Cuenta
 </Menu.Item>
  </Link>

  <Link href="/carrito">
<Menu.Item as="a"  className='m-0'>
    <Icon name="cart"  />
    carrito : <span style={{border:'1px solid black',borderRadius:'2px'}}>{productsCart}</span> 
 </Menu.Item>
  </Link>

  </>
      )}
  {!localStorage.getItem(TOKEN) ? (<Menu.Item onClick={abrirmodal} >
        <Icon name="user outline" />
       Iniciar sesion
      </Menu.Item>
) : ( <Menu.Item  onClick={cerrarsesion} >
  cerrar sesion
  <Icon name="sign-in alternate" />

</Menu.Item>)}
  
   
  
  </Menu>
    
  
    )
  }

  export default MenuOptions