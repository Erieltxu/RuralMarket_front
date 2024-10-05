import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const clearCart = () => {
        console.log('clearCart called, current cartItems:', cartItems); 

        setCartItems([]); // Vacía el carrito

        // Usar useEffect para detectar el cambio en el carrito
    };

    // Monitorea si el carrito realmente se vacía
    useEffect(() => {
        console.log('Cart has been updated:', cartItems);
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, clearCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
