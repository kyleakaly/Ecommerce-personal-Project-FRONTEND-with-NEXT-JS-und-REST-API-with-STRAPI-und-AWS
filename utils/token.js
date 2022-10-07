import jwt_decode from 'jwt-decode'


const TOKEN = "token"

const setToken = (token) => {
    localStorage.setItem(TOKEN,token);
}

const getToken = () => {
    return localStorage.getItem(TOKEN)
}


const transformartoken = (token) => {
 return jwt_decode(token)
}

const eliminarToken = () => {

    localStorage.removeItem('token')

}

const expirentoken = (token) => {

    const tokenDecode = jwt_decode(token)
    const expireDate = tokenDecode.exp * 1000;
    const currenDate = new Date().getTime();

    if(currenDate > expireDate) {
        return true;
    }

    return false

}

export {
    
    transformartoken,
    setToken,
    TOKEN,
    getToken,
    eliminarToken,
    expirentoken

}