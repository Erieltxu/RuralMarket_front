
import React, { useState } from 'react';

import Cart from './Cart';
import ProductStore from './ProductStore';

function TotalCart() {
    const [cart, setCart] = useState([]);

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            
            
            <ProductStore addToCart={addToCart}/>
            <Cart cart={cart} />
        </div>
    );
}

export default TotalCart;
