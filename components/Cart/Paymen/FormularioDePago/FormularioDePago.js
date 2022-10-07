import React, {useState} from 'react'
import { Button } from 'semantic-ui-react'
import {useRouter} from "next/router"
import { CardElement,useStripe ,useElements} from '@stripe/react-stripe-js'
import { size } from 'lodash'
import {toast} from 'react-toastify'
import useAuth from '../../../../hooks/useAuth'
import cartAuth from '../../../../hooks/cartAuth'
import { pagarConStripe } from '../../../../api/cart'



const FormularioDePago = ({guardarDireccion,todoslosProductos,totalPrecio}) => {

    const [loadingpago,setLoadingPago] = useState(false)

    const {auth,logout} = useAuth()
    const router = useRouter();

    const stripe = useStripe()
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingPago(true)

        if(!stripe || !elements){

            return null

        }

        const cartElement = elements.getElement(CardElement)
        const result = await stripe.createToken(cartElement)
        console.log(result.token)

        if(result.error){
           toast.error(result.error.message)
        }else {
            const response = await pagarConStripe(
                result.token,
                todoslosProductos,
                auth.idUser,
                guardarDireccion,
                logout ,
                totalPrecio)

            if(size(response) > 0){
                toast.success('pedido completado')
            }else{
                toast.error('error al realizar el pedido')
            }

        }

        

        setLoadingPago(false)
        router.push('/mis-pedidos')


    }

  return (
   <form className='form-payment' onSubmit={handleSubmit}>
<CardElement />
<Button type='submit' className='bottom' loading={loadingpago}  disabled={!stripe}> Pagar</Button>

   </form>
  )
}

export default FormularioDePago