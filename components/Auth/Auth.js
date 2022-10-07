import React, {useState} from 'react'
import AuthLogin from './AuthLogin/AuthLogin'

import AuthRegister from './AuthRegister/AuthRegister'
import { Button } from 'semantic-ui-react'


const Auth = ({cerrarmoda,setTitle}) => {

    const [showLogin,setShowLogin] = useState(true)

    const showRegisterForm = () => {

      setShowLogin(false)

    }

    const showLoginForm  = () => {

      setShowLogin(true)

    }


  return (

    <div className='Auth' >

{!showLogin ? <AuthRegister setTitle={setTitle}  setShowLogin={setShowLogin} /> : <AuthLogin cerrarmoda={cerrarmoda} setTitle={setTitle} setShowLogin={setShowLogin}/>}

    <Button onClick={cerrarmoda} className="botonlogn"> {showLogin ? 'Cerrar Ventana Login' : 'Cerrar Ventana register'}</Button>

    <div className='registro'>

    {showLogin ? (<p>No tienes cuenta Registrate <span onClick={showRegisterForm} className="linkregister" >Aqui</span></p>) : (<p> tienes cuenta inicia sesion <span  className="linkregister" onClick={showLoginForm}> Aqui</span></p> )}

    </div>
    </div>


  )
}

export default Auth