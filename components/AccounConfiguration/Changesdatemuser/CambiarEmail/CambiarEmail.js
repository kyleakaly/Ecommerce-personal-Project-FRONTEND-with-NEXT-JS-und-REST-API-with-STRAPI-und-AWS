import React, {useEffect, useState} from 'react'
import {Form,Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cambiarNombreDeUsuario } from '../../../../api/user'
import { toast } from 'react-toastify'


const CambiarEmail = ({user,logout,setReloadUser}) => {
    const [loading,setLoading] = useState(false)

    const formik = useFormik({
      initialValues : {
  
        email : user.email || "",
        repetiremail : ''
  
      },
      validationSchema : yup.object({
  
        email : yup.string().email().required(true).oneOf([yup.ref("repetiremail")],true),
        repetiremail : yup.string().email().required(true).oneOf([yup.ref("email")],true)
      }),
  
      onSubmit : async (formdata) => {
  
        try {
          setLoading(true)
          
                
              const response = await  cambiarNombreDeUsuario(user.id,formdata,logout);


                setTimeout(() => {
                    setLoading(false)
                    setReloadUser(true)
      
                    toast.success('tu cambio de email fue correcto ', {
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
          toast.error('Hubo un error no pudimos cambiar tu email ', {
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
          <h4>Quieres editar tu Email?</h4>
          <Form onSubmit={formik.handleSubmit}>
              <Form.Group widths="equal">
                  <Form.Input type='text' name="email" 
                  placeholder={`escribe tu nuevo email`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.email}
                  value={formik.values.email}
                   />
                    
                  <Form.Input type='text' name="repetiremail" 
                  placeholder={`respite el email`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.repetiremail}
                  value={formik.values.repetiremail}
                   />
              </Form.Group>
              <Button loading={loading} type='submit' className='bottom'>Actualizar Email</Button>
          </Form>
         
      </div>
  
    )
  }
  

export default CambiarEmail