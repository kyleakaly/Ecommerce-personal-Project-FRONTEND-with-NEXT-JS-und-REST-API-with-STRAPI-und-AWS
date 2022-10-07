import { BASE_PATH } from "../utils/constants"
import { authFecht } from "../utils/fetch"
import qs from 'qs'

const obtenerSiUnUsiarioDioFavorito = async (idUser, idProducto, logout) =>{

  
    try {
        
    
        const url = `${BASE_PATH}/api/favorites?pupulate=*&users_permissions_user=${idUser}&producto=${idProducto}`;
        return await authFecht(url, null, logout);
      } catch (error) {
        console.log(error);
        return null;
      }
    }



const crearUnFavorito = async (idUser,idProducto,logout) => {

try {

  const dataFound = await obtenerSiUnUsiarioDioFavorito(idUser, idProducto, logout);
  if (dataFound.data.length > 0) {return "Ya esta en favoritos";}
  else {
    const url = `${BASE_PATH}/api/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {data : {producto: idProducto, users_permissions_user: idUser,   }}),
    };
    const result = await authFecht(url, params, logout);
    return result;
  }
} catch (error) {
  console.log(error);
  return null;
}
}

const eliminarElFavorito = async ( idUser,idProducto,logout ) => {

  try {
    const dataFound = await obtenerSiUnUsiarioDioFavorito(idUser, idProducto, logout);
  
    if (dataFound.data.length > 0) {
      const url = `${BASE_PATH}/api/favorites/${dataFound.data[0].id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFecht(url, params, logout);
      if (result.error) throw "Server error";
      return true;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

}

const obtenersolomisfavorites = async (idUser,logout) => {

try {

  const url = `${BASE_PATH}/api/favorites?populate=*&users_permissions_user=${idUser}`;
  const result = await authFecht(url,logout)
return result
  
} catch (error) {
  console.log(error)
  return null
}

}

export {
    obtenerSiUnUsiarioDioFavorito,
    crearUnFavorito,
    eliminarElFavorito,
    obtenersolomisfavorites
}