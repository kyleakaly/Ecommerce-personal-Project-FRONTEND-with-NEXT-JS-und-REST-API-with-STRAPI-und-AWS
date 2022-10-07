import { getToken } from "./token";
import { expirentoken } from "./token";

const  authFecht = async (url,params,logout) => {

    const token = getToken();
    if(!token){
        logout();
    }else{

        if(expirentoken(token)){
            //token caducado
            logout()
        }else{

            const paramsTemp = {

                ...params,
                headers:  {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                },

            };

            try {
                
                const response = await fetch(url,paramsTemp).then(resultado => {
                    return resultado.json()
                })
                return response;

            } catch (error) {
                console.log(error)
                return error
            }

        }

    }

}

export{
    authFecht
}