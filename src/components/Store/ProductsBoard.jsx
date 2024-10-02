import React, { useEffect, useState } from 'react';

function ProductsBoard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Cargar productos desde localStorage
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow">
                        <img
                            src={product.photo}
                            alt={product.name}
                            className="w-full h-40 object-cover mb-2 rounded-md"
                        />
                        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                        <p className="text-gray-500">{product.category}</p>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="text-gray-600">Stock: {product.stock}</p>
                        <p className="text-green-600 font-semibold">
                            {`${parseFloat(product.price).toFixed(2).replace('.', ',')} €`}
                        </p>
                    </div>
                ))
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
}

export default ProductsBoard;
