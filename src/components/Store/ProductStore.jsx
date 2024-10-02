import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT, CATEGORIES } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';
import CategoryForm from '../createProduct/CategoryForm'; // Importamos el componente CategoryForm

function ProductStore() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['Todos']);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [quantities, setQuantities] = useState({});
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    // Obtener categorías desde el backend
    const fetchCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setCategories(['Todos', ...response.data]); // Agregar 'Todos' al principio
        } catch (error) {
            console.error('Error al cargar las categorías', error);
        }
    };

    // Obtener productos desde el backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCT, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error al cargar los productos', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    // Filtrar productos por categoría
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Manejo de agregar nueva categoría
    const handleAddCategory = async () => {
        if (newCategory.trim() === '' || newCategoryDescription.trim() === '') {
            setErrors({ ...errors, newCategory: 'El nombre y la descripción son requeridos.' });
            return;
        }

        try {
            const response = await axios.post(CATEGORIES, {
                name: newCategory,
                description: newCategoryDescription,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            setCategories([...categories, response.data]); // Agregar la nueva categoría a la lista
            setIsAddingCategory(false);
            setNewCategory('');
            setNewCategoryDescription('');
            setPopupMessage('Categoría agregada exitosamente');
            setPopupType('success');
            setShowPopup(true);
        } catch (error) {
            console.error('Error al agregar categoría', error);
            setPopupMessage('Error al agregar categoría');
            setPopupType('error');
            setShowPopup(true);
        }
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

            {/* Filtro de categoría usando CategoryForm */}
            <CategoryForm
                productCategory={selectedCategory}
                setProductCategory={setSelectedCategory}
                categories={categories}
                isAddingCategory={isAddingCategory}
                setIsAddingCategory={setIsAddingCategory}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                newCategoryDescription={newCategoryDescription}
                setNewCategoryDescription={setNewCategoryDescription}
                handleAddCategory={handleAddCategory}
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
                        <p className="text-green-600 font-semibold">
                            {typeof product.price === 'number' ? (
                                `€${product.price.toFixed(2).replace('.', ',')}`
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
