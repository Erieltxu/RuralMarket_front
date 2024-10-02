import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT } from '../../config/urls';
import CreateProductForm from './CreateProductForm';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function ProductList() {
    const [products, setProducts] = useState([]); // Estado para almacenar todos los productos creados
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [error, setError] = useState(null); // Estado para manejar errores
    const navigate = useNavigate(); // Usa el hook useNavigate

    // Función para agregar un nuevo producto
    const addProduct = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]); // Agrega el nuevo producto a la lista
    };

    // Función para navegar a la página de ProductStore
    const handleUploadProducts = () => {
        // Aquí podrías agregar lógica para verificar antes de navegar si es necesario
        navigate('/store'); // Navega a la página ProductStore
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Crear Producto</h1>

            {/* Formulario para crear un nuevo producto */}
            <CreateProductForm addProduct={addProduct} />

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 mb-4 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />

            {/* Mostrar error si hay algún problema */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Botón para subir productos */}
            <button 
                onClick={handleUploadProducts}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Subir Productos
            </button>

            {/* Mostrar todos los productos creados */}
            {products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {products.map((product, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow">
                            <img
                                src={product.photo} // Asegúrate de que esta propiedad sea correcta
                                alt={product.name}
                                className="w-full h-40 object-cover mb-2 rounded-md"
                            />
                            <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="text-gray-700 mb-2">{product.description}</p> {/* Descripción del producto */}
                            <p className="text-gray-600">Stock: {product.stock}</p> {/* Stock del producto */}
                            <p className="text-green-600 font-semibold">
                                {`€${parseFloat(product.price).toFixed(2).replace('.', ',')}`}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
