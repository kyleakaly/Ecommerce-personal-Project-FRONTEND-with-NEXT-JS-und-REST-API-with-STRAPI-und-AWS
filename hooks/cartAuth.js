import { useContext } from "react";
import CartContext from '../context/CartContext'

const cartAuth = () => {

    return useContext(CartContext)

}

export default cartAuth

