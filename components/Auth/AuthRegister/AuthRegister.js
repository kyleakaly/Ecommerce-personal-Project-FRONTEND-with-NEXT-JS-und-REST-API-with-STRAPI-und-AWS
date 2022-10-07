import React,{useEffect,useState} from 'react'
import {Form,Button} from 'semantic-ui-react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { registerApi } from '../../../api/user'
import { toast } from 'react-toastify'

const AuthRegister = ({setTitle,setShowLogin}) => {

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    
    setTitle('Registro de Usuario.')

  }, [])

  const formik = useFormik({

    initialValues : {
      name : '',
      username:"",
      email:"",
      password:"",
    },

   validationSchema : yup.object({

    name : yup.string().required('el campo es obligatorio'),
    username : yup.string().required('el campo es obligatorio'),
    email : yup.string().email('el email es obligatorio').required(true),
    password : yup.string().required(true)

   }),

   onSubmit : async (formData) => {

    setLoading(true)
      const response =  await  registerApi(formData)
     if(response?.jwt){
      toast.success('Registro correcto seras direccionado a el inicio de sesion', {
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
        setShowLogin(true)
          
    
        }, 2000);
     }else{
      setLoading(false)
      toast.error('error en el registro ', {
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
    <>
<Form className='login' onSubmit={formik.handleSubmit}>

<label htmlFor='name'>Nombre Completo </label>
<Form.Input type='text' name="name" placeholder="Escribe tu Nombre" onChange={formik.handleChange} error={formik.errors.name && true} />
<label htmlFor="username">Nombre de Usuario</label>
<Form.Input type='text' name="username" id="username" placeholder="Escribe tu Nombre de usuario." onChange={formik.handleChange} error={formik.errors.username}  />
<label htmlFor="email">Correo Electronico</label>
<Form.Input type='texto' name="email" id="email" placeholder="Escribe tu nuevo Correo." onChange={formik.handleChange} error={formik.errors.email}  />
<label htmlFor="password">Contraseña</label>
<Form.Input type='password' name="password" id="password" placeholder="Escribe tu contraseña." onChange={formik.handleChange} error={formik.errors.password}  />
<Button className='botonenviarinicio' type='submit' loading={loading} >Registrarme</Button>


</Form>
</>
  )
}

export default AuthRegister