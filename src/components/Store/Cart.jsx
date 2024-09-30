import React from 'react';

function Cart({ cart }) {
    // Calcular el total del carrito
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mt-6">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">El carrito está vacío.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center my-2">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="text-xl font-bold mt-4">
                        Total: €{getTotalPrice()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
