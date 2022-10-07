import react,{useMemo,useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext';
import 'semantic-ui-css/semantic.min.css'
import '../scss/global.scss'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify'
import { transformartoken,setToken,getToken ,eliminarToken } from '../utils/token'
import { obtenerProDuctos,agregarProductoAlCarro,contartProductCart ,removerProductos} from '../api/cart';
import CartContext from '../context/CartContext';



function MyApp({ Component, pageProps }) {


  const [auth,setAuth] = useState(undefined)
  const [reloadUser,setReloadUser] = useState(false)
  const [totalProductsCart,setTotalProductsCart] = useState(0)
  const [actualzarNumeroCarro,setActualizarNuemeroCarro] = useState(false)

  useEffect(() => {
  
    const token = getToken();
    if(token){

      setAuth({
        token,
        idUser : transformartoken(token).id
      });

    }else {

      setAuth(null)

    }

    setReloadUser(false)

  }, [reloadUser])
  
  useEffect(() => {
 
    setTotalProductsCart(contartProductCart())
    setActualizarNuemeroCarro(false)
  }, [actualzarNumeroCarro,auth])
  

  const login = (token) => {
    setToken(token);
    const tokens = transformartoken(token)
    setAuth({
      token,
      idUser : tokens.id
    })

  }

  const agregarelproducto = (product) => {

    const token = getToken();

    if(token){

      agregarProductoAlCarro(product)
    setActualizarNuemeroCarro(true)


    }else{

toast.warning('para comprar un comic debes estar con inicio de sesion')

    }

  }

  const authData = useMemo(()=>({

    auth: auth,
    login : login,
    logout: () => eliminarToken(),
    setReloadUser : setReloadUser,
    setAuth : setAuth


  }),[auth]);
  
  const authCart = useMemo(
    
    ()=>({

      
    productsCart : totalProductsCart,
    addProductCart : (product) => agregarelproducto(product),
    getProductsCart : obtenerProDuctos,
    removeProductCart : (producto) => removerProductos(producto),
    removeAllProductsCart : () => null

  }),[totalProductsCart]
  )

  if(auth === undefined){
    return null
  }

  return (
  <AuthContext.Provider value={authData}>
    <CartContext.Provider value={authCart}>
  <Component {...pageProps} />
  <ToastContainer
autoClose={2000}
draggable
closeOnClick
/>
</CartContext.Provider>
</AuthContext.Provider>
  )
}

export default MyApp
