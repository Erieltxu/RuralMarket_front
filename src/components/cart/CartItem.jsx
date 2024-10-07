import React, { useEffect } from 'react';
import UseApi from '../../services/useApi';
import { CARTITEM } from "../../config/urls";
import { useCart } from '../../context/CartContext'; // Importamos el contexto

const CartItems = ({ cartId }) => {
    const { cartItems, setCartItems } = useCart(); // Obtenemos los items del contexto
    const { data: fetchedCartItems, loading, error } = UseApi({ apiEndpoint: `${CARTITEM}?cart_id=${cartId}`, method: 'GET' });

    useEffect(() => {
        if (fetchedCartItems && Array.isArray(fetchedCartItems)) {
            setCartItems(fetchedCartItems); // Actualizamos los items del carrito en el contexto
        }
    }, [fetchedCartItems, setCartItems]);

    if (loading) return <p>Cargando artículos del carrito...</p>;
    if (error) return <p>Error: {error.message || error}</p>;

    // Aseguramos que cartItems sea un array antes de mapear
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
