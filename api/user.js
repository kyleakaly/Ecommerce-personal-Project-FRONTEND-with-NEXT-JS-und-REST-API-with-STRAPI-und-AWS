import { BASE_PATH} from '../utils/constants'
import { authFecht } from '../utils/fetch';

const registerApi = async (formData) => {

   try {

    const url = `${BASE_PATH}/api/auth/local/register`
    const params = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
        
    };

    const response = await fetch(url,params).then(respuesta=>{
        return respuesta.json()
    })
    return  response
       
   } catch (error) {
       console.log(error)
       return null;
   }

}


const loginApi = async (formData) => {

    try {

    const url = `${BASE_PATH}/api/auth/local`
    const params = {

        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        } ,

        body : JSON.stringify(formData)

    };

    const response = await fetch(url,params).then(respuesta =>{
        return respuesta.json()
    }).catch(error=>{
        console.log(error)
    })

    return response
        
    } catch (error) {
        console.log(error);
        return null
    }

}

const resetPassword = async (email) => {

    try {

        const url = `${BASE_PATH}/api/auth/forgot-password`;
    const params = {
        method: 'POST', 
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email : email.identifier})
    }

    const response = await fetch(url,params).then(respuesta => {
        return respuesta.json()
    }).catch(error=>{
        console.log(error)
    })

    return response
        
    } catch (error) {
        
        console.log(error);
        return null

    }

    

}

const usuariosRegistrado = async (logout)=>{

    try {
       
    const url = `${BASE_PATH}/api/users/me`
        const result = await authFecht(url,null,logout);

        return result ? result : null;

    } catch (error) {
        return null
    }


}

const cambiarNombreDeUsuario = async (id,data,logout) => {

    try {

        const url = `${BASE_PATH}/api/users/${id}`
        const params = {

            method: "PUT",
            headers : {

                'Content-Type' : 'application/json'

            },

            body : JSON.stringify(data)

        }

        const response = await authFecht(url,params,logout)

        return response 

        
    } catch (error) {
        return null
    }
}

const cambiarPasswordDeUsuario = async (id,password,logout) => {

    try {

        const url = `${BASE_PATH}/api/users/${id}`
        const params = {

            method: "PUT",
            headers : {

                'Content-Type' : 'application/json'

            },

            body : JSON.stringify({password})

        }

        const response = await authFecht(url,params,logout)

        return response 

        
    } catch (error) {
        return null
    }
}




export {
    registerApi,
    loginApi,
    resetPassword,
    usuariosRegistrado,
    cambiarNombreDeUsuario,
    cambiarPasswordDeUsuario,
   
}