import React, {useEffect, useState} from 'react'
import {Form,Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cambiarNombreDeUsuario } from '../../../../api/user'
import { toast } from 'react-toastify'


const ChangeNameForm = ({user,logout,setReloadUser}) => {

  const [loading,setLoading] = useState(false)

  const formik = useFormik({
    initialValues : {

      name : user.name || ""

    },
    validationSchema : yup.object({

      name : yup.string().required(true)

    }),

    onSubmit : async (formdata) => {

      try {
        setLoading(true)
        
       
            const response = await  cambiarNombreDeUsuario(user.id,formdata,logout);
          
           

            setTimeout(() => {
              setLoading(false)
              setReloadUser(true)

              toast.success('tu cambio de Nombre fue correcto ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              

            }, 1000);
            

      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error('Hubo un error no pudimos cambiar tu nombre ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

    }

  })


  return (
    
    <div className='change-name-form'>
        <h4>Quieres editar tu nombre?</h4>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input name="name" 
                placeholder={`escribe tu nuevo nombre`} 
                onChange={formik.handleChange} 
                error={formik.errors.name}
                value={formik.values.name}
                 />
            </Form.Group>
            <Button loading={loading} type='submit' className='bottom'>Actualizar Nombre</Button>
        </Form>
       
    </div>

  )
}

export default ChangeNameForm