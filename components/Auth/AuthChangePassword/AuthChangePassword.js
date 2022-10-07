import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {Form,Button} from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { resetPassword } from '../../../api/user'


const AuthChangePassword = ({setTitulo,setShow}) => {

  const [loading,setLoading] = useState(false)


  useEffect(() => {
    setTitulo('cambio Contrasena')
  }, [])
  



    const formik = useFormik({
        initialValues : {

          identifier : '',

        },
        validationSchema : yup.object({

          identifier : yup.string().email().required(true),

        }),
        onSubmit : async (formData)=> {

          setLoading(true)

          const response = await resetPassword(formData)
          console.log(response)
          if(response.data != null){

            toast.success('cambio de contrasena correcta ', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
               setTimeout(() => {
                
              setLoading(false)
                formik.resetForm()
              setShow(false)
          
              }, 2000);

          }else{
            setLoading(false)
            toast.error('cambio de contrasena incorrecta', {
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
    
<Form className='login' onSubmit={formik.handleSubmit}>

    
<label htmlFor="email">Email</label>
<Form.Input type='text' name="identifier" id="identifier" placeholder="Escribe tu email." onChange={formik.handleChange} error={formik.errors.identifier} />
<Button className='olvidatestuContrasena' type='submit' loading={loading} >Cambiar contrasena </Button>


</Form>

  )
}

export default AuthChangePassword