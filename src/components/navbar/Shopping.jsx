
import React, { useState } from 'react';
import ProductStore from './ProductStore';
import ShoppingCart from './ShoppingCart';

const Shopping = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) => 
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            } else {
                return [...prevItems, item];
            }
        });
    };

    return (
        <div>
            <ShoppingCart cartItems={cartItems} />
            <ProductStore addToCart={addToCart} />
        </div>
    );
};

export default Shopping
