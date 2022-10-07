import React from 'react'
import {Elements} from '@stripe/react-stripe-js' 
import {loadStripe} from '@stripe/stripe-js'

import { STRIPE_TOKEN } from '../../../utils/constants'
import FormularioDePago from './FormularioDePago/FormularioDePago'

const PagoConEstripe = ({guardarDireccion,todoslosProductos,totalPrecio}) => {

  const stripePromise = loadStripe(STRIPE_TOKEN)

  return (
    <div className='pagoconstripe'>
      <div className='textos'>   <h1> PagoConEstripe: </h1></div>
      <div className='data'>

    <Elements stripe={stripePromise}>
      <FormularioDePago guardarDireccion={guardarDireccion} todoslosProductos={todoslosProductos} totalPrecio={totalPrecio} />
    </Elements>

      </div>
   
      </div>
  )
}

export default PagoConEstripe