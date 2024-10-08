import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT } from '../../config/urls';
import CreateProductForm from './CreateProductForm';
import { useNavigate } from 'react-router-dom'; 

function ProductList() {
    const [products, setProducts] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 


    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);


    const addProduct = (product) => {
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts, product];
            
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    
    const deleteProductFromDatabase = async (productId) => {
        try {
            await axios.delete(`${PRODUCT}${productId}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            console.log(`Producto ${productId} eliminado de la base de datos.`);
        } catch (error) {
            console.error('Error al eliminar el producto de la base de datos:', error);
        }
    };

    
    const removeProduct = async (productToRemove) => {
        await deleteProductFromDatabase(productToRemove.id);
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.filter(product => product !== productToRemove);

            localStorage.setItem('products', JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    
    const handleUploadProducts = () => {
        setProducts([]); 
        localStorage.removeItem('products'); 
        navigate('/store');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Crear Producto</h1>

            
            <CreateProductForm addProduct={addProduct} />

            
            <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 mb-4 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />

            
            {error && <div className="text-red-500 mb-4">{error}</div>}

            
            <button 
                onClick={handleUploadProducts}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Subir Productos
            </button>

            
            {products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {products.map((product, index) => (
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

                            
                            <button 
                                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                                onClick={() => removeProduct(product)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
