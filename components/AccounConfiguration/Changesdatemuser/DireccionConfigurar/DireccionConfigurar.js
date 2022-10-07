import React, {useEffect, useState} from 'react'
import {Form,Button,Icon, Grid} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cambiarDireccion, crearDirecciones, encontrarlosAtodos,eliminarUnaDireccion } from '../../../../api/direcions'
import { toast } from 'react-toastify'
import BasicModal from '../../../Modal/BasicModal'




const DireccionConfigurar = ({user,logout,setReloadUser}) => {

    const [loading,setLoading] = useState(false)
    const [show,setShow] = useState(false)
    const [titulo,setTitulo] = useState('')
    const [reloadAdresses,setReloadAdresses] = useState(false)
    const [adresses,setAdresses] = useState(null)
 

    useEffect(() => {
      ( async ()=>{

        const response = await encontrarlosAtodos(user.id,logout)

        setAdresses(response?.data || [])
        setReloadAdresses(false)

      })()
    }, [reloadAdresses])



    const formik = useFormik({
      initialValues : {
        direccion : '',
        telefono: '',
        codigopostal : '',
        nombredeusuario: '',

  
      },
      validationSchema : yup.object({
  
        direccion : yup.string().required(true),
        telefono : yup.string().required(true),
        codigopostal : yup.string().required(true),
        nombredeusuario : yup.string().required(true),
  
      }),
  
      onSubmit : async (formdata) => {
 
        try {
          setLoading(true)
        
        
            createAdres(formdata,logout)
           
           
          
         
  
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
  

    const abrirModal = () => {
        setShow(true)
        setTitulo('Añadir Nueva Direccion')
    }

    const cerrarmodal = () => {
        setShow(false)
        
    }



    const createAdres = async (formdata,logout) => {
      const formDataTemp = {...formdata , users_permissions_user : user.id }
      const response = await crearDirecciones(formDataTemp,logout);
      setTimeout(() => {
        setLoading(false)
        setReloadUser(true)

        cerrarmodal()
        setReloadAdresses(true)
        formik.resetForm()
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
      
    }

    const updateAdress = async (id,formdata,logout) => {

      setTitulo('Editar Informacion')
      const formDataTemp = {...formdata, users_permissions_user : id}

      const response = await cambiarDireccion(id,formDataTemp,logout);
      if(!response){

        toast.warning('error al crear la direccion')
        setLoading(false)

      }else{

        setTimeout(() => {
          setLoading(false)
          setReloadUser(true)
  
          cerrarmodal()
          formik.resetForm()
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
  
      }
     

    } 

    if(!adresses){
      return null
    }

    const handleEliminarDireccion = async ({id}) => {



      try {


    
        const response = await eliminarUnaDireccion(id,logout)
        if(response){
          setReloadAdresses(true);
        }

        
      } catch (error) {
        console.log(error)
        return null
      }


    }

    const handleEditarInformacion= async (adresse) => {

      setShow(true)
      console.log(adresse.attributes)
        setTitulo('Editar mi direccion')
        

    }
  
    return (

        <div className="account_configuration">
        <div className="title">direccion de envio</div>
        <div className="data">
        <p className='abrirmodaldireccion' onClick={abrirModal}>Añadir direccion  <Icon name='plus'/> </p>   
          <div className='direccion'>

             <Grid>
            {adresses.length != 0 ?   adresses.map( adresse =>{
            const {attributes} = adresse
           return (
               
                  <Grid.Column className='todoslosdatos' idpost={adresse.id} key={adresse.id} mobile={16} tablet={8} computer={4}>
                                 <p className='direcciondeenvio' > Nombre del Titular : <span >{attributes.nombredeusuario}</span></p>
                                 <p className='direcciondeenvio'> direccion actual de envio es : <span >{attributes.direccion}</span>  </p>
                                 <p className='direcciondeenvio'> Codigo Postal : <span >{attributes.codigopostal}</span>  </p>
                                 <p className='direcciondeenvio'> telefono : <span >{attributes.telefono}</span>  </p>
                                 <div className='organizarBotones'>

                                 <Button className='button' onClick={()=>handleEditarInformacion(adresse)}>Editar</Button>
                                 <Button className='button1' onClick={()=>handleEliminarDireccion(adresse)}>Eliminar</Button>

                                 </div>
                               
                             </Grid.Column>
                            
                             )}) : <h2>no tienes tu direccion escrita todavia</h2> } 
            </Grid>
                
          </div>

          <BasicModal show={show} setShow={setShow} title={titulo} size={'small'} >
          <Form className='cambiaremail' onSubmit={formik.handleSubmit} >
              <Form.Group widths="equal">
                  <Form.Input name="direccion" 
                  placeholder={`escribe tu nuevo direccion`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.direccion}
                  value={formik.values.direccion}
                   />
                    <Form.Input name="codigopostal" 
                  placeholder={`escribe tu Codigo Postal`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.codigopostal}
                  value={formik.values.codigopostal}
                   />
              </Form.Group>
              <Form.Group widths="equal">
                  <Form.Input name="telefono" 
                  placeholder={`escribe tu Telefono`} 
                  onChange={formik.handleChange} 
                  error={formik.errors.telefono}
                  value={formik.values.telefono}
                   />
                    <Form.Input name="nombredeusuario" 
                  placeholder={`escribe tu Nombre `} 
                  onChange={formik.handleChange} 
                  error={formik.errors.nombredeusuario}
                  value={formik.values.nombredeusuario}
                   />
              </Form.Group>
              <Button loading={loading}  type='submit' className='bottom'>Añadir direccion</Button>
          </Form>
          </BasicModal>

      </div>
      </div>

  
    )
  }
export default DireccionConfigurar