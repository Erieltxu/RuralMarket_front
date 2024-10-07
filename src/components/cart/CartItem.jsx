import React from 'react';
import UseApi from '../../services/useApi';
import { CARTITEM } from "../../config/urls";

const CartItems = ({ cartId }) => {
    const { data: cartItems, loading, error } = UseApi({ apiEndpoint: `${CARTITEM}?cart_id=${cartId}`, method: 'GET' });

    if (loading) return <p>Cargando artículos del carrito...</p>;
    if (error) return <p>Error: {error}</p>;

    // Asegúrate de que cartItems sea un arreglo antes de intentar mapear
    const items = Array.isArray(cartItems) ? cartItems : [];

    return (
        <div>
            <h3>Artículos del carrito</h3>
            {items.length > 0 ? (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            ID del producto: {item.product_id}, Cantidad: {item.quantity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay artículos en el carrito.</p>
            )}
        </div>
    );
};

export default CartItems;
