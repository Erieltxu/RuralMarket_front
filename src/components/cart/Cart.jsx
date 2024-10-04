import React, { useEffect } from 'react';
import UseApi from '../../services/useApi';
import { CART, CARTITEM } from "../../config/urls";
import axios from 'axios';

const Cart = () => {
    const { data: cartData, loading, error } = UseApi({ apiEndpoint: CART });

    useEffect(() => {
        console.log('Datos del carrito:', cartData);
    }, [cartData]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar el carrito</p>;

    return (
        <>
            {cartData && cartData.length > 0 && cartData[0].items ? (
                <ul className="divide-y divide-gray-200">
                    {cartData[0].items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">El carrito está vacío.</p>
            )}
        </>
    );
};

const CartItem = ({ item }) => {

    const handleIncrease = async () => {
        try {
            const newQuantity = item.quantity + 1;
            await axios.put(`${CARTITEM}${item.id}/`, { quantity: newQuantity });
            window.location.reload();  // Para refrescar el estado del carrito
        } catch (error) {
            console.error('Error al aumentar la cantidad:', error);
        }
    };

    const handleDecrease = async () => {
        try {
            const newQuantity = item.quantity - 1;
            if (newQuantity < 1) {
                await axios.delete(`${CARTITEM}${item.id}/`);  // Eliminar el producto si la cantidad es menor que 1
            } else {
                await axios.put(`${CARTITEM}${item.id}/`, { quantity: newQuantity });
            }
            window.location.reload();  // Para refrescar el estado del carrito
        } catch (error) {
            console.error('Error al disminuir la cantidad:', error);
        }
    };

    const handleRemove = async () => {
        try {
            await axios.delete(`${CARTITEM}${item.id}/`);  // Eliminar el producto
            window.location.reload();  // Para refrescar el estado del carrito
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <li className="py-4 flex justify-between items-start">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
                    {item.product.name}
                    <button 
                        onClick={handleRemove} 
                        className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                        Eliminar
                    </button>
                </h3>
                <p className="text-sm text-gray-500">Precio: {parseFloat(item.product.price).toFixed(2)} €</p>
                <div className="flex items-center mt-2">
                    <button 
                        onClick={handleDecrease}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                        onClick={handleIncrease}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                        +
                    </button>
                </div>
                <p className="text-gray-800 font-semibold mt-2">
                    Subtotal: {(item.quantity * parseFloat(item.product.price)).toFixed(2)} €
                </p>
            </div>
        </li>
    );
};

export default Cart;