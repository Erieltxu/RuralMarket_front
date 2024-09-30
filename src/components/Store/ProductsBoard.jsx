import React, { useState } from 'react';
<<<<<<< HEAD
=======
import ButtonGreen from '../ButtonGreen';
>>>>>>> b2055af (DONE: add button category TODO :post products)

const initialProducts = [
    { id: 1, name: 'Tomate', category: 'Frutas', price: 2.99, imageUrl: '/img/tomato.png' },
    { id: 2, name: 'Lechuga', category: 'Verduras', price: 1.5, imageUrl: '/img/lettuce.png' },
    { id: 3, name: 'Zanahoria', category: 'Verduras', price: 1.0, imageUrl: '/img/carrots.png' },
    { id: 4, name: 'Manzana', category: 'Frutas', price: 3.2, imageUrl: '/img/apple.png' },
    { id: 5, name: 'Pepino', category: 'Verduras', price: 1.75, imageUrl: '/img/cucumbers.png' },
];

function ProductsBoard({ addToCart }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
<<<<<<< HEAD
=======
    const [quantities, setQuantities] = useState({}); // Estado para manejar la cantidad de cada producto
    const [error, setError] = useState(null); // Estado para manejar errores
>>>>>>> b2055af (DONE: add button category TODO :post products)

    const categories = ['Todos', 'Frutas', 'Verduras'];

    // Filtrar productos por categoría y nombre
    const filteredProducts = initialProducts.filter((product) => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

<<<<<<< HEAD
=======
    // Incrementar la cantidad del producto
    const incrementQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1,
        }));
    };

    // Decrementar la cantidad del producto
    const decrementQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
        }));
    };

    // Manejar agregar al carrito
    const handleAddToCart = (product) => {
        try {
            const quantity = quantities[product.id] || 1; // Obtener la cantidad seleccionada (por defecto 1)
            addToCart({ ...product, quantity }); // Agregar el producto con la cantidad seleccionada al carrito
            setError(null); // Limpiar errores si la acción fue exitosa
        } catch (err) {
            // Manejo del error si ocurre
            setError('Hubo un problema al agregar el producto al carrito. Inténtalo de nuevo.');
            console.error('Error al agregar al carrito:', err);
        }
    };

>>>>>>> b2055af (DONE: add button category TODO :post products)
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>

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

<<<<<<< HEAD
=======
            {/* Mostrar mensaje de error si lo hay */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

>>>>>>> b2055af (DONE: add button category TODO :post products)
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-40 object-cover mb-2 rounded-md"
                        />
                        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                        <p className="text-gray-500">{product.category}</p>
                        <p className="text-green-600 font-semibold">€{product.price.toFixed(2)}</p>
<<<<<<< HEAD
                        <button
                            className="bg-blue-500 text-white p-2 mt-2 rounded-md"
                            onClick={() => addToCart(product)}
                        >
                            Agregar al carrito
                        </button>
=======

                        <div className="flex items-center mb-2">
                            <button
                                className="bg-gray-200 p-1 rounded"
                                onClick={() => decrementQuantity(product.id)}
                            >
                                -
                            </button>
                            <span className="mx-2">{quantities[product.id] || 1}</span>
                            <button
                                className="bg-gray-200 p-1 rounded"
                                onClick={() => incrementQuantity(product.id)}
                            >
                                +
                            </button>
                        </div>

                        {/* <button
                            className="bg-blue-500 text-white p-2 mt-2 rounded-md w-full"
                            onClick={() => handleAddToCart(product)}
                        >
                            Agregar al carrito
                        </button> */}
                        <ButtonGreen
                            backgroundColor="bg-green-500"
                            textColor="text-white"
                            onClick={() => handleAddToCart(product)}
                        >
                            Agregar al carrito
                        </ButtonGreen>

>>>>>>> b2055af (DONE: add button category TODO :post products)
                    </div>
                ))}
            </div>
        </div>
    );
}

<<<<<<< HEAD


export default ProductsBoard
=======
export default ProductsBoard;
>>>>>>> b2055af (DONE: add button category TODO :post products)
