import React, { useState } from 'react';
import CreateProductForm from '../createProduct/CreateProductForm';

const initialProducts = [
    { id: 1, name: 'Tomate', category: 'Frutas', price: 2.99, imageUrl: '/img/tomato.png' },
    { id: 2, name: 'Lechuga', category: 'Verduras', price: 1.5, imageUrl: '/img/lettuce.png' },
    { id: 3, name: 'Zanahoria', category: 'Verduras', price: 1.0, imageUrl: '/img/carrots.png' },
    { id: 4, name: 'Manzana', category: 'Frutas', price: 3.2, imageUrl: '/img/apple.png' },
    { id: 5, name: 'Pepino', category: 'Verduras', price: 1.75, imageUrl: '/img/cucumbers.png' },
];

function ProductList() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const categories = ['Todos', 'Frutas', 'Verduras'];

    // Función para filtrar productos por categoría y nombre
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Función para agregar un nuevo producto a la lista
    const addProduct = (newProduct) => {
        // Creamos un id único para el nuevo producto
        const newId = products.length + 1;
        const productWithId = { ...newProduct, id: newId };
        setProducts([...products, productWithId]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>

            {/* Formulario para crear nuevos productos */}
            <CreateProductForm addProduct={addProduct} />

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 mb-4 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filtro por categoría */}
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

            {/* Lista de productos filtrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow">
                        <img
                            src={product.imageUrl ? product.imageUrl : '/img/placeholder.png'}

                            alt={product.name}
                            className="w-full h-40 object-cover mb-2 rounded-md"
                        />
                        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                        <p className="text-gray-500">{product.category}</p>
                        <p className="text-green-600 font-semibold">€{product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
