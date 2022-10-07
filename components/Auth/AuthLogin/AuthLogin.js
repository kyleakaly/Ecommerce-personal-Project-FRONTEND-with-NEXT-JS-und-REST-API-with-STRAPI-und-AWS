import React, {useEffect,useState} from 'react'
import {Form,Button} from 'semantic-ui-react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { loginApi } from '../../../api/user'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import BasicModal from '../../Modal/BasicModal'
import AuthChangePassword from '../AuthChangePassword/AuthChangePassword'

const AuthLogin = ({setTitle,setShowLogin,cerrarmoda}) => {

  const [loading,setLoading] = useState(false)
  const [showmodalchange,setShowmodalchange] = useState(false)
  const [titulo,setTitulo] = useState('')



  useEffect(() => {
  
    setTitle('Inicio De sesion.')

  }, [])

  const autht = useAuth()
 const {login} = autht
  
  const formik = useFormik({
    initialValues : {
      email : '',
      password:'',
    },
    validationSchema : yup.object ({

      identifier : yup.string().email(true).required(true),
      password : yup.string().required(true),

    }),
    onSubmit :  async (formData) => {

      setLoading(true)
       const response = await  loginApi(formData)
       if(response?.jwt){
        login(response.jwt)
        toast.success('Inicio de sesion correcto ', {
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
          cerrarmoda(false)  
      
          }, 2000);
       }else{
        setLoading(false)
        toast.error('el usuario o la contraseña es incorrecto ', {
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

    const abrirelmodal = () => {
      setShowmodalchange(true)
      
    }

  return (
    <Form className='login' onSubmit={formik.handleSubmit}>

    
    <label htmlFor="identifier">Correo Electronico</label>
    <Form.Input type='email' name="identifier" id="identifier" placeholder="Escribe tu Nombre de usuario." onChange={formik.handleChange} error={formik.errors.identifier} />
    <label htmlFor="password">Contrasena</label>
    <Form.Input type='password' name="password" id="password" placeholder="Escribe tu Nombre de usuario."  onChange={formik.handleChange} error={formik.errors.password}/>
    <Button className='botonenviarinicio' type='submit' loading={loading}>Iniciar</Button>
    <Button className='olvidatestuContrasena' type='button' onClick={abrirelmodal} >Olvidaste tu contraseña </Button>

    <BasicModal  show={showmodalchange} setShow={setShowmodalchange} title={titulo} size={'small'} >
       <AuthChangePassword setTitulo={setTitulo} setShow={setShowmodalchange}/>
      </BasicModal>


    </Form>
  )
}

export default AuthLogin