// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartTotal, setCartTotal] = useState(0); // Inicializa el total del carrito en 0

//     // Aquí puedes incluir la lógica para actualizar cartTotal cuando los productos se añadan o eliminen del carrito

//     return (
//         <CartContext.Provider value={{ cartTotal, setCartTotal }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     return useContext(CartContext);
// };
import React from 'react'

const CartContex = () => {
  return (
    <div>CartContex</div>
  )
}

export default CartContex