import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { CART, CARTITEM } from "../../config/urls";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { data: cartData, loading, error } = UseApi({ apiEndpoint: CART });

    useEffect(() => {
        if (cartData && cartData.length > 0 && cartData[0].items) {
            setCartItems(cartData[0].items);
        }
    }, [cartData]);

    // Este useEffect se asegura de que el total se recalcula cada vez que cambian los items del carrito
    useEffect(() => {
        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + item.quantity * parseFloat(item.product.price);
        }, 0);
        setTotal(totalAmount);
    }, [cartItems]);

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            if (newQuantity < 1) {
                await handleRemove(itemId); // Eliminar si la cantidad es menor que 1
                return;
            }

            await axios.put(`${CARTITEM}${itemId}/`, {
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
            await axios.delete(`${CARTITEM}${itemId}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            const updatedItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedItems);
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
    const token = localStorage.getItem('token'); // Obtener el token

    const handleIncrease = () => {
        const newQuantity = item.quantity + 1;
        onUpdateQuantity(item.id, newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = item.quantity - 1;
        onUpdateQuantity(item.id, newQuantity);
    };

    return (
        <li className="py-4 flex justify-between items-start">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
                    {item.product.name}
                    <button 
                        onClick={() => onRemove(item.id)} 
                        className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                        Eliminar
                    </button>
                </h3>
                <p className="text-sm text-gray-500">Precio: {parseFloat(item.product.price).toFixed(2)} €</p>
                <div className="flex items-center mt-2">
                    <button 
                        onClick={handleDecrease} 
                        className="bg-customRed text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                        onClick={handleIncrease} 
                        className="bg-customGreen text-white w-8 h-8 rounded-full flex items-center justify-center"
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
