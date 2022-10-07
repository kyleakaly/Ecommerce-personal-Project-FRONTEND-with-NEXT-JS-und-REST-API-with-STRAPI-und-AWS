import { BASE_PATH ,CART} from "../utils/constants";
import { authFecht } from "../utils/fetch";
import { toast } from "react-toastify";
import {size,includes,remove} from 'lodash'

const  obtenerProDuctos =  () => {
    const cart = localStorage.getItem(CART);

    if (!cart) return null;
    else {
      const products = cart.split(",");
      return products;
    }


}


const agregarProductoAlCarro =  ( product) => {

    const cart =  obtenerProDuctos()
    
    console.log(cart)

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = includes(cart,product);
    console.log(productFound)
    if (productFound) {
      toast.warning("Este producto ya existe en el carrito");
    } else {
      
      cart.push(product);
      
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido al carrito");
    }
  }

}

const contartProductCart = () => {

    const cart = obtenerProDuctos();

    if(!cart) {
        return 0
    }else {
        return cart.length
    }

}

const removerProductos =  (producto) => {

const cart = obtenerProDuctos();
  const filtrarlosdatos = cart.filter(function(obtenerLosdatos) {
    return obtenerLosdatos != producto
  })
localStorage.removeItem(CART)
localStorage.setItem(CART,filtrarlosdatos)

}

const pagarConStripe = async (token,product,idUser,address,logout,total) => {
try {

  

  const url = `${BASE_PATH}/api/orders`;
  const params = {

    method : 'POST',
    headers : {

      'Content-Type' : 'application/json'

    },

    body : JSON.stringify({token,product,idUser,address,total})

  }

  const resolve = await authFecht(url,params,logout)
  return resolve
  
} catch (error) {
  console.log(error)
  return null
}
}

export {

    obtenerProDuctos,
    agregarProductoAlCarro,
    contartProductCart,
    removerProductos,
    pagarConStripe

}