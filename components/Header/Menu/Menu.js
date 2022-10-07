import React , {useState, useEffect}from 'react'
import {Container,Grid,Label} from 'semantic-ui-react'
import BasicModal from '../../Modal/BasicModal'
import MenuPlataforma from './MenuPlataforma/MenuPlataforma'
import MenuOptions from './MenuOptions/MenuOptions'
import Auth from '../../Auth/Auth'
import { usuariosRegistrado } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'

import { obtenerlosdatosdelmenu } from '../../../api/platform'



const Menutienda = () => {

  const [plataforma,setPlataforma] = useState([])
  const [show,setShow] = useState(false);
  const [user,setUser] = useState(undefined);
  const [title,setTitle] = useState('');

  const {logout,setAuth,auth} = useAuth()


 useEffect(() => {

  (async()=>{

    const response = await usuariosRegistrado(logout)
    setUser(response)
  })()

 }, [auth])

 useEffect(() => {

  (async()=>{

    const response = await obtenerlosdatosdelmenu()
    setPlataforma(response?.data || [])
  })()

 }, [])
 

  
const abrirmodal = () => {
  setShow(true)
}
  
const cerrarmoda = () => {
  setShow(false)
}

  return (
    <div className='menu'>
      <Container>
        <Grid>
          <Grid.Column className='menu_left' width={6}>
           <MenuPlataforma plataforma={plataforma} />
          </Grid.Column>

          <Grid.Column className='menu_right' width={10}>
          {user !== undefined &&  <MenuOptions user={user}  logout={logout} setAuth={setAuth}  abrirmodal={abrirmodal} setTitle={setTitle} /> }
           </Grid.Column>
            

        </Grid>
      </Container>
      <BasicModal  show={show} setShow={setShow} title={title} size={'small'} >
       <Auth setTitle={setTitle} cerrarmoda={cerrarmoda}/>
      </BasicModal>
    </div>
  )
}

export default Menutienda


