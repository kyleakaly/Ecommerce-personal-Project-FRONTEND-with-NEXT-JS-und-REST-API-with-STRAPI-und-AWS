
import { BASE_PATH} from '../utils/constants'
import { authFecht } from '../utils/fetch';

const crearDirecciones = async (address,logout) => {

    try {
        const url = `${BASE_PATH}/api/addresses`

        const params = {

            method: "POST",
            headers : {

                'Content-Type' : 'application/json'

            },

            body : JSON.stringify({data : address})

        }
        const result = await authFecht(url, params, logout);
        return result;

        
    } catch (error) {
        console.log(error)
        return null
    }
}

const cambiarDireccion = async (id,address,logout) => {

    try {

        const url = `${BASE_PATH}/api/addresses/${id}`
        const params = {

            method: "PUT",
            headers : {

                'Content-Type' : 'application/json'

            },

            body : JSON.stringify({ data : address})

        }

        const response = await authFecht(url,params,logout)

        if(response.statusCode !== 200){
            "error del servidor"
        }
        return response

        
    } catch (error) {
        console.log(error)
        return null
    }
}


const encontrarlosAtodos = async (id,logout) => {

    try {
        const url = `${BASE_PATH}/api/addresses?users_permissions_user=${id}`;
       
        const resolve = await authFecht(url,null,logout)

        if(resolve.error){
            throw "error en el servidor"
        }
        return resolve
    
    } catch (error) {
        console.log(error)
        return null
    }
}

const eliminarUnaDireccion = async (id,logout) => {

try {
    const url = `${BASE_PATH}/api/addresses/${id}`

    const params = {

        method : 'DELETE',
        headers : {

            'Content-Type' : 'application/json'

        },

    }
    
    const resolve = await authFecht(url,params,logout)
    
    if(resolve.error){
       throw "Error del servidor";

    }

    return  true
    
} catch (error) {
    console.log(error)
    return false
}
}

export{
    cambiarDireccion,
    crearDirecciones,
    encontrarlosAtodos,
    eliminarUnaDireccion
}