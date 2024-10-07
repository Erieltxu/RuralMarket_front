import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para vaciar el carrito
    const clearCart = () => {
        console.log('Carrito antes de vaciarse:', cartItems);  
        setCartItems([]); // Vacía el carrito
    };

    useEffect(() => {
    if (cartItems.length === 0) {
        // Evita volver a cargar los productos del carrito si ya está vacío
        console.log("Carrito está vacío, evitando recargar datos.");
        return;
    }
    
    // Fetch de datos normales
}, [cartItems]); // Se activa cuando cambia cartItems

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
