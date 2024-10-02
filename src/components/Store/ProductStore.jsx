import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';


function ProductStore() {
    const [products, setProducts] = useState([]); // Estado para almacenar todos los productos
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [quantities, setQuantities] = useState({}); // Estado para manejar las cantidades de los productos
    const [errors, setErrors] = useState({}); // Estado para manejar errores

    // Obtener productos desde el backend (una sola vez)
    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCT, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`, // Manejar la autorización si es necesario
                },
            });
            setProducts(response.data); // Establecer los productos en el estado
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            setErrors({ api: 'Error al cargar los productos.' });
        }
    };

    useEffect(() => {
        // Cargar los productos una sola vez al montar el componente
        fetchProducts();
    }, []);

    // Filtrar productos por nombre según el término de búsqueda
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para incrementar la cantidad del producto
    const incrementQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1,
        }));
    };

    // Función para decrementar la cantidad del producto
    const decrementQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
        }));
    };

    // Función para manejar agregar el producto al carrito
    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        console.log(`Añadido al carrito: ${product.name} - Cantidad: ${quantity}`);
        // Aquí puedes agregar la lógica para añadir el producto al carrito en el backend o localStorage
    };

    return (
        <div className="max-w-4xl mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 mb-4 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />

            {/* Mostrar productos filtrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow bg-gray-50">
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
                            {typeof product.price === 'string' ? (
                                `${parseFloat(product.price).toFixed(2).replace('.', ',')} €`
                            ) : (
                                'Precio no disponible'
                            )}
                        </p>

                        {/* Controles de cantidad */}
                        <div className="flex items-center mt-2 ">
                            <button
                                className="bg-red-200 p-1 rounded"
                                onClick={() => decrementQuantity(product.id)}
                            >
                                -
                            </button>
                            <span className="mx-2">{quantities[product.id] || 1}</span>
                            <button
                                className="bg-green-200 p-1 rounded"
                                onClick={() => incrementQuantity(product.id)}
                            >
                                +
                            </button>
                        </div>
                        <div className="w-[400px] h-[100px]px-6 py-3 text-lg ml-4"  >
                            <ButtonGreen
                                backgroundColor="bg-green-500"
                                textColor="text-white px-6 py-3" 
                                style={{ width: '200px', padding: '12px 24px', fontSize: '1.25rem' }}
                                onClick={() => handleAddToCart(product)}
                            // Ancho completo
                            >
                                Agregar al carrito
                            </ButtonGreen>

                        </div>

                    
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductStore;
