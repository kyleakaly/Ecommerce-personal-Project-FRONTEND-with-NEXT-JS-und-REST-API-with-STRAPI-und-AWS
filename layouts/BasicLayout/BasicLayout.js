import React from 'react'
import { Container } from 'semantic-ui-react'
import classNames from 'classnames'

//componentes
import Header from '../../components/Header/Header'


//para importat sass en next no se hace exportandolo normal se hace de esta manera


//para poder visualizar los datos del layout necesitamos poner el props children
const BasicLayout = ({children,className}) => {
  return (
   
    <Container fluid  className={classNames('basic-layout', {

      [className]: className,

    })}>
       <Header/>
      <Container className='content'>
      {children}
      </Container>
      
        </Container>

  )
}

export default BasicLayout