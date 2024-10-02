import React, { useState } from 'react';
import ButtonGreen from '../ButtonGreen';

function ProductCard({ product, handleAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(Math.max(quantity - 1, 1));
    };

    return (
        <div className="border rounded-lg p-4 shadow bg-gray-50 flex flex-col justify-between">
            <img
                src={product.photo}
                alt={product.name}
                className="w-full h-70 object-cover mb-2 rounded-md" // Aumentar la altura de la imagen
            />
            <h2 className="text-xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-500">
                {product.category_name || 'Categoría no disponible'}{' '}
                <span className="text-sm text-gray-700">
                    de: {product.seller_first_name || 'Vendedor desconocido'}
                </span>
            </p>
            <p className="text-gray-700 mb-2">{product.description}</p>

            {/* Alineamos el stock, precio y contador hacia abajo */}
            <div className="mt-auto">
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-green-600 font-semibold">
                    {typeof product.price === 'string' ? (
                        `${parseFloat(product.price).toFixed(2).replace('.', ',')} €`
                    ) : (
                        'Precio no disponible'
                    )}
                </p>

                <div className="flex items-center mt-2 mb-4">
                    <button className="bg-red-200 p-1 rounded" onClick={decrementQuantity}>
                        -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button className="bg-green-200 p-1 rounded" onClick={incrementQuantity}>
                        +
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <ButtonGreen
                    backgroundColor="bg-customGreen"
                    textColor="text-white px-6 py-3"
                    style={{ width: '100%', padding: '12px 24px', fontSize: '1.25rem' }}
                    onClick={() => handleAddToCart(product, quantity)}
                >
                    Agregar al carrito
                </ButtonGreen>
            </div>
        </div>
    );
}

export default ProductCard;
