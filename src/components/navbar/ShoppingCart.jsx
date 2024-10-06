import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { CART } from '../../config/urls';
import io from 'socket.io-client'; // Importamos socket.io-client

const socket = io('http://localhost:3000'); // Cambia a la URL correcta de tu servidor

const ShoppingCart = () => {
    const { data: cartData, error, loading } = UseApi({ apiEndpoint: CART });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Comprobamos si hay un error en la carga de datos
        if (error) {
            console.error('Error al cargar el carrito:', error);
            return;
        }

        // Si los datos del carrito están disponibles
        if (cartData && cartData.length > 0 && cartData[0].items) {
            const totalAmount = cartData[0].items.reduce((sum, item) => {
                const price = parseFloat(item.product.price) || 0; // Asegurarse de que el precio es un número
                return sum + item.quantity * price;
            }, 0);
            setTotal(totalAmount); // Actualiza el total
        } else {
            setTotal(0); // Si no hay items, el total es 0
        }
    }, [cartData, error]); // Actualiza si hay un error o si los datos del carrito cambian

    // Este efecto se activa cuando el carrito se actualiza vía WebSockets
    useEffect(() => {
        // Escuchar actualizaciones en el carrito desde el servidor
        socket.on('cartUpdate', (updatedCartData) => {
            if (updatedCartData && updatedCartData.items) {
                const totalAmount = updatedCartData.items.reduce((sum, item) => {
                    const price = parseFloat(item.product.price) || 0;
                    return sum + item.quantity * price;
                }, 0);
                setTotal(totalAmount);
            }
        });

        // Limpia el socket cuando el componente se desmonta
        return () => {
            socket.off('cartUpdate');
        };
    }, []);

    if (loading) {
        return <p>Cargando...</p>; // Mostrar un estado de carga mientras se obtienen los datos
    }

    return (
        <div className="max-w-3xl mx-auto mt-2 flex items-center">
            {/* Icono del carrito */}
            <img
                src="../../../public/img/cart.svg" // URL del icono del carrito
                alt="Cart Icon"
                className="h-6 w-6 mr-4" // Tamaño y margen de la imagen
            />
            {total.toFixed(2)} € {/* Muestra el total formateado */}
        </div>
    );
};

export default ShoppingCart;
