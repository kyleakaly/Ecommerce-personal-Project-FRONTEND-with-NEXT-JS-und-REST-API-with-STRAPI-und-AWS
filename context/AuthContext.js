import {createContext} from 'react'

const AuthContext = createContext({

    auth: undefined,
    login : () =>{
        return null
    },
    logout: () =>{
        return null
    },
    setReloadUser : () => {
        return null
    }

})

export default AuthContext;