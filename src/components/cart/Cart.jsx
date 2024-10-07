import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { CART, CARTITEM } from "../../config/urls"; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate(); 
    const { data: cartData, loading, error } = UseApi({ apiEndpoint: CART });
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (cartData && cartData.length > 0 && cartData[0].items) {
            setCartItems(cartData[0].items);
        }
    }, [cartData]);

    // Este useEffect se asegura de que el total se recalcula cada vez que cambia cartItems
    useEffect(() => {
        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + item.quantity * parseFloat(item.product.price);
        }, 0);
        setTotal(totalAmount);
    }, [cartItems]); // Recalcula el total cuando cambian los items del carrito

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            if (newQuantity < 1) {
                await handleRemove(itemId); // Eliminar si la cantidad es menor que 1
                return;
            }

            const response = await axios.put(`${CARTITEM}${itemId}/`, {
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            const updatedItems = cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);

        } catch (error) {
            console.error('Error al actualizar la cantidad:', error.response?.data || error);
        }
    };

    const handleRemove = async (itemId) => {
        try {
            const response = await axios.delete(`${CARTITEM}${itemId}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            const updatedItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedItems);

            console.log('Producto eliminado:', response.data);
        } catch (error) {
            console.error('Error al eliminar el producto:', error.response?.data || error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Carrito de compras</h2>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    onRemove={handleRemove} 
                                    onUpdateQuantity={updateQuantity} 
                                />
                            ))}
                        </ul>
                        <div className="mt-6 border-t pt-4 text-center">
                            <h3 className="text-xl font-bold text-gray-800">Total de la compra: {total.toFixed(2)} €</h3>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button 
                                onClick={() => navigate('/recibo')} 
                                className="bg-customGreen text-white px-4 py-2 rounded"
                            >
                                Generar recibo
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600 text-center">El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
};

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {

    const handleIncrement = () => {
        const newQuantity = item.quantity + 1;
        onUpdateQuantity(item.id, newQuantity);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            onUpdateQuantity(item.id, newQuantity);
        } else {
            onRemove(item.id); // Eliminar si la cantidad es 1 y se decrementa
        }
    };

    const handleRemove = async () => {
        await onRemove(item.id); // Llama a la función de eliminar en el componente padre
    };

    return (
        <li className="py-4 flex justify-between items-start">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Precio: {parseFloat(item.product.price).toFixed(2)} €</p>
                <div className="flex items-center mt-2">
                    <button 
                        onClick={handleDecrement} 
                        className="bg-customRed text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button 
                        onClick={handleIncrement} 
                        className="bg-customGreen text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-end ml-4"> 
                <p className="text-gray-800 font-semibold text-lg"> 
                    Subtotal: {(item.quantity * parseFloat(item.product.price)).toFixed(2)} €
                </p>
                <button 
                    onClick={handleRemove}
                    className="bg-customRed text-white text-sm px-2 py-1 rounded mt-1" 
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export default Cart;
