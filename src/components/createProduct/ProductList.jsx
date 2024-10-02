import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT } from '../../config/urls';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [error, setError] = useState(null);

    const categories = ['Todos', 'Frutas', 'Verduras'];

    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCT, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data); // Verifica la estructura de la respuesta
            setProducts(response.data);
        } catch (err) {
            setError('Error al cargar los productos.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts(); // Cargar productos cuando el componente se monte
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Catálogo de Productos</h2>

            <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 mb-4 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex justify-end mb-4">
                <select
                    className="p-2 border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow">
                        <img
                            src={product.photo}
                            alt={product.name}
                            className="w-full h-40 object-cover mb-2 rounded-md"
                        />
                        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                        <p className="text-gray-500">{product.category}</p>
                        <p className="text-green-600 font-semibold">
                            {typeof product.price === 'number' ? (
                                `€${product.price.toFixed(2).replace('.', ',')}`
                            ) : (
                                'Precio no disponible'
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
