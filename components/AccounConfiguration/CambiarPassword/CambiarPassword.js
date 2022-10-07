import React, {useEffect, useState} from 'react'
import {Form,Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cambiarPasswordDeUsuario } from '../../../api/user'
import { toast } from 'react-toastify'

const CambiarPassword = ({user,logout,setReloadUser}) => {
    const [loading,setLoading] = useState(false)

    const formik = useFormik({
      initialValues : {
  
        password :  "",
        repetirpassword : ''
  
      },
      validationSchema : yup.object({
  
        password : yup.string().required(true).oneOf([yup.ref("repetirpassword")],true),
        repetirpassword : yup.string().required(true).oneOf([yup.ref("password")],true)
      }),
  
      onSubmit : async (formdata) => {
  
        console.log(formdata)
        try {
          setLoading(true)
          
                
              const response = await  cambiarPasswordDeUsuario(user.id,formdata.password,logout);
          

              if(response.status == 404){

                toast.error('Hubo un error no pudimos cambiar tu contraseña', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

              }else{

                setTimeout(() => {
                    setLoading(false)
                    setReloadUser(true)
      
                    toast.success('tu cambio de contraseña fue correcto ', {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                      logout()
      
                  }, 1000);
              

              }

                
        } catch (error) {
          console.log(error)
          setLoading(false)
          toast.error('Hubo un error no pudimos cambiar tu contraseña', {
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
          <h4>Quieres editar tu Contraseña?</h4>
          <Form onSubmit={formik.handleSubmit}>
              <Form.Group widths="equal">
                  <Form.Input type='password' name="password" 
                  placeholder={`introduce tu vieja contraseña`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.password}
                  value={formik.values.password}
                   />
                    
                  <Form.Input type='password' name="repetirpassword" 
                  placeholder={`introduce tu nueva contraseña`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.repetirpassword}
                  value={formik.values.repetirpassword}
                   />
              </Form.Group>
              <Button loading={loading} type='submit' className='bottom'>Actualizar Password</Button>
          </Form>
         
      </div>
  
    )
  }

export default CambiarPassword