import React, { createContext, useContext, useState, useEffect } from 'react';


const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

   
    const clearCart = () => {
        console.log('Carrito antes de vaciarse:', cartItems);  
        setCartItems([]);
    };

    useEffect(() => {
    if (cartItems.length === 0) {
        console.log("Carrito está vacío, evitando recargar datos.");
        return;
    }
    
  
}, [cartItems]); 

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
