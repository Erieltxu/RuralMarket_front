import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { CART, ORDERS_URL } from "../../config/urls"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Importa el contexto

const Order = () => {
    const navigate = useNavigate();
    const { clearCart, cartItems, setCartItems } = useCart(); // Agrega setCartItems para sincronizar el carrito
    const { data: cartData, loading, error } = UseApi({ apiEndpoint: CART });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cartData && cartData.length > 0 && cartData[0].items) {
            const totalAmount = cartData[0].items.reduce((sum, item) => {
                return sum + item.quantity * parseFloat(item.product.price);
            }, 0);
            setTotal(totalAmount);

            // Actualiza el carrito en el contexto con los datos de la API si no están sincronizados
            if (cartItems.length === 0) {
                setCartItems(cartData[0].items); // Sincroniza los datos de la API con el contexto
            }
        }
    }, [cartData, cartItems, setCartItems]);

    const handleSendOrder = async () => {
        const cartItemsToSend = cartData[0].items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
        }));
    
        try {
            // Enviar pedido
            const response = await axios.post(ORDERS_URL, {
                cart_items: cartItemsToSend,
                total: total,
                cart: cartData[0].id // Incluye la ID del carrito si es necesario
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Pedido enviado:', response.data);
    
            // Vaciar carrito en el backend
            await axios.delete(CART, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
    
            console.log('Carrito vaciado en el backend');
    
            // Vaciar carrito en el frontend
            clearCart();
    
            navigate('/confirmation');
        } catch (error) {
            console.error('Error al enviar el pedido o vaciar el carrito:', error.response?.data || error);
        }
    };

    // Escuchar los cambios en cartItems
    useEffect(() => {
        if (cartItems.length === 0) {
            console.log('Cart items after clearing (from useEffect):', cartItems); // Verifica si el carrito se vacía
        }
    }, [cartItems]); // Se activa cuando el carrito cambia

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar la orden</p>;

    const items = cartData?.length > 0 ? cartData[0].items : [];

    return (
        <div className="max-w-lg mx-auto mb-16 mt-16">
            <div className="bg-white shadow-md rounded-lg p-8 border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Recibo de compra</h2>

                {items.length > 0 ? (
                    <>
                        <ul className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="py-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-gray-800 font-semibold">{item.product.name}</h3>
                                        <p className="text-gray-500">Cantidad: {item.quantity}</p>
                                        <p className="text-gray-500">Precio unitario: €{parseFloat(item.product.price).toFixed(2)}</p>
                                    </div>
                                    <p className="text-gray-800 font-bold"> 
                                        Subtotal: €{(item.quantity * parseFloat(item.product.price)).toFixed(2)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 border-t pt-4 text-center">
                            <h3 className="text-xl font-bold text-gray-800">Total: €{total.toFixed(2)}</h3>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button 
                                onClick={handleSendOrder} 
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Enviar
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600 text-center">No hay productos en la orden.</p>
                )}
            </div>
        </div>
    );
};

export default Order;
