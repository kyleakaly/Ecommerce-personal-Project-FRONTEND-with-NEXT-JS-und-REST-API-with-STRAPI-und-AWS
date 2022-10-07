import React from 'react'
import { Modal,Icon } from 'semantic-ui-react'
const BasicModal = ({show,setShow,title,children,...rest}) => {

  const cerrarmodal = () => {
    setShow(false)
  }
  return (
    <Modal className='basic-modal' open={show} onClose={cerrarmodal} {...rest}>
      <Modal.Header> <span>{title} </span> <Icon name='close' onClick={cerrarmodal}/>  </Modal.Header>
      <Modal.Content>
      {children}
      </Modal.Content>
    </Modal>
  )
}

export default BasicModal