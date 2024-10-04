/*import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import Receipt from './Receipt';
import useApi from '../../services/useApi'; // Usamos tu hook
import { CART } from '../../config/urls'; // Ajusta la ruta si es necesario

const Cart = () => {
    const [cart, setCart] = useState([]);  // Estado inicial vacío para el carrito
    const [total, setTotal] = useState(0); // Estado inicial del total
    const { data, loading, error } = useApi({ apiEndpoint: CART, method: 'GET' }); // Obtenemos los datos de la API

    // Actualiza el carrito y el total cuando los datos están disponibles
    useEffect(() => {
        if (data && data.cartItems) {
            setCart(data.cartItems || []);  // Asegura que siempre sea un array
            setTotal(data.total || 0);  // Asegura que total sea un número
        }
    }, [data]);

    // Función para vaciar el carrito
    const clearCart = () => {
        setCart([]); // Vacia el carrito
        setTotal(0); // Resetea el total
    };

    if (loading) return <p>Cargando...</p>; // Indicador de carga
    if (error) return <p>Error al cargar el carrito</p>; // Manejo de error

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">Carrito de Compras</h2>
            
            {cart.length === 0 ? ( // Si el carrito está vacío
                <EmptyCart />       // Muestra el componente EmptyCart
            ) : (
                <>
                    <ul>
                        {cart.map(product => (
                            <CartItem
                                key={product.id}
                                product={product}
                                changeQuantity={() => {}} // Función para cambiar cantidad, aún no implementada
                                removeItem={() => {}} // Función para eliminar producto, aún no implementada
                            />
                        ))}
                    </ul>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold text-gray-800">Total: €{total.toFixed(2)}</h3>
                        <button
                            className="w-full mt-6 p-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition"
                            onClick={clearCart}
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                    
                 
                    <Receipt cart={cart} total={total} />
                </>
            )}
        </div>
    );
};

export default Cart;*/

import React from 'react';
import UseApi from '../../services/useApi';
import CartItems from '../../components/cart/CartItem';
import {CART} from "../../config/urls";

const Cart = () => {
    const { data: cartData, loading, error } = UseApi({ apiEndpoint: CART , method: 'GET' });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Extrae los detalles del carrito (user_id y date) y cart_id para pasarlo a CartItems
    const { user, date, id: cart_id } = cartData;

    return (
        <div>
            <h2>Cart</h2>
            <p>User ID: {user}</p>
            <p>Date: {date}</p>

            {/* Pasa el cart_id a CartItems para cargar los productos */}
            <CartItems cartId={cart_id} />
        </div>
    );
};

export default Cart;