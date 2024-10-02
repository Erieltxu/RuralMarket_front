import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT, CATEGORIES } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';
import CategoryForm from '../createProduct/CategoryForm'; // Importamos el componente CategoryForm

function ProductStore() {
    const [products, setProducts] = useState([]); // Estado para almacenar todos los productos
    const [categories, setCategories] = useState(['Todos']); // Estado para las categorías, incluyendo 'Todos'
    const [selectedCategory, setSelectedCategory] = useState('Todos'); // Categoría seleccionada por el usuario
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [quantities, setQuantities] = useState({}); // Estado para manejar las cantidades
    const [errors, setErrors] = useState({});

    // Obtener categorías desde el backend (una sola vez)
    const fetchCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setCategories(['Todos', ...response.data]); // Agregar 'Todos' al principio de la lista
        } catch (error) {
            console.error('Error al cargar las categorías', error);
        }
    };

    // Obtener productos desde el backend (una sola vez)
    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCT, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setProducts(response.data); // Establecer los productos en el estado
        } catch (error) {
            console.error('Error al cargar los productos', error);
        }
    };

    useEffect(() => {
        // Cargar las categorías y productos una sola vez al montar el componente
        fetchCategories();
        fetchProducts();
    }, []);

    // Filtrar productos por categoría y término de búsqueda localmente
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 mb-4 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filtro de categoría */}
            <CategoryForm
                productCategory={selectedCategory}
                setProductCategory={setSelectedCategory}
                categories={categories}
                isAddingCategory={false}
                newCategory={''}
                newCategoryDescription={''}
                handleAddCategory={() => {}}
                errors={errors}
            />

            {/* Mostrar productos filtrados */}
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
                        <p className="text-gray-700 mb-2">{product.description}</p> {/* Descripción del producto */}
                        <p className="text-gray-600">Stock: {product.stock}</p> {/* Stock del producto */}
                        <p className="text-green-600 font-semibold">
                            {typeof product.price === 'string' ? (
                                `€${parseFloat(product.price).toFixed(2).replace('.', ',')}`
                            ) : (
                                'Precio no disponible'
                            )}
                        </p>

                        {/* Controles de cantidad */}
                        <div className="flex items-center mt-2">
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

                        {/* Botón para agregar al carrito */}
                        <ButtonGreen
                            backgroundColor="bg-green-500"
                            textColor="text-white"
                            onClick={() => handleAddToCart(product)}
                        >
                            Agregar al carrito
                        </ButtonGreen>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductStore;
