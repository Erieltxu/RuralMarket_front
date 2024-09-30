import React from 'react';

function ProductTable({ products }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Lista de productos</h2>
            {products.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-2 text-left">Nombre</th>
                            <th className="border-b p-2 text-left">Categoría</th>
                            <th className="border-b p-2 text-left">Precio</th>
                            <th className="border-b p-2 text-left">Stock</th>
                            <th className="border-b p-2 text-left">Vendedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border-b p-2">{product.name}</td>
                                <td className="border-b p-2">{product.category.name}</td>
                                <td className="border-b p-2">
                                    {/* Aseguramos que el precio sea un número */}
                                    {typeof product.price === 'number'
                                        ? `$${product.price.toFixed(2)}`
                                        : 'Precio inválido'}
                                </td>
                                <td className="border-b p-2">{product.stock}</td>
                                <td className="border-b p-2">{product.seller}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
}

export default ProductTable;
