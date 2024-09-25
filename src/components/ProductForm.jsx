// ProductForm.js
import React, { useState } from 'react';

function ProductForm({ addProduct }) {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

  
        const newProduct = {
            id: Date.now(),  
            name: productName,
            category: productCategory,
            price: parseFloat(productPrice),
            imageUrl: URL.createObjectURL(productImage),  
        };

   
        addProduct(newProduct);

        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductImage(null);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mb-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Añadir Producto</h2>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nombre del producto</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Categoría</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Precio</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagen del producto</label>
                <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border rounded"
                    onChange={handleImageChange}
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Crear Producto
            </button>
        </form>
    );
}

export default ProductForm;
