import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer';


//create an cart context 
export const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(CartReducer, {
        cartList: [],
    });

    return (
        <CartContext.Provider value={{ cartState, cartDispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider