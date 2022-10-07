import Link from 'next/link'
import {Menu} from 'semantic-ui-react'

const MenuPlataforma = ({plataforma}) => {


    return(
      <Menu>
        
          {plataforma.length != 0 ? plataforma.map(plataform=>{

const { attributes,id } = plataform

return(

  <Link key={id} href={`/entretenimiento/${attributes.url}`}>
  <Menu.Item as="a" >{attributes.title}</Menu.Item>
   </Link>
   
) 

        }):  (<h1>no hay menus</h1>)} 
       
      </Menu>
    )
  }

export default MenuPlataforma