/*import {PRODUCT} from "../../config/urls";
import UseApi from "../../services/useApi";

const CartItem = ({ product, changeQuantity, removeItem }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
            <div>
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-500">Precio: €{product.price}</p>
                <p className="text-gray-500">Cantidad: {product.quantity}</p>
            </div>
            <div className="flex items-center">
                <button
                    className="px-2 py-1 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 transition"
                    onClick={() => changeQuantity(product, '+')}
                >
                    +
                </button>
                <button
                    className="px-2 py-1 bg-red-600 text-white rounded-xl shadow-sm hover:bg-red-700 transition ml-2"
                    onClick={() => changeQuantity(product, '-')}
                >
                    -
                </button>
                <button
                    className="px-2 py-1 bg-gray-500 text-white rounded-xl shadow-sm hover:bg-gray-600 transition ml-4"
                    onClick={() => removeItem(product.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CartItem;*/

import React from 'react';
import UseApi from '../../services/useApi';
import {CARTITEM} from "../../config/urls"

const CartItems = ({ cartId }) => {
    const { data: cartItems, loading, error } = UseApi({ apiEndpoint: `${CARTITEM}?cart_id=${cartId}`, method: 'GET' });

    if (loading) return <p>Loading cart items...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Cart Items</h3>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        Product ID: {item.product_id}, Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartItems;