import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT, CATEGORIES } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';
import ProductDetails from '../createProduct/ProductDetails';
import CategoryForm from '../createProduct/CategoryForm';

function CreateProductForm({ addProduct }) {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState(''); // Estado para la descripción
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [seller, setSeller] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    // Función para cargar categorías
    const fetchCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES);
            setCategories(response.data);
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        }
    };

    useEffect(() => {
        fetchCategories(); // Cargar categorías al inicio
    }, []);

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const validateForm = () => {
        let formErrors = {};
        if (!productName) formErrors.productName = 'El nombre del producto es obligatorio.';
        if (!productCategory) formErrors.productCategory = 'Selecciona o agrega una categoría.';
        if (!productDescription) formErrors.productDescription = 'La descripción del producto es obligatoria.'; // Validación de descripción
        if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
            formErrors.productPrice = 'Introduce un precio válido.';
        }
        if (!productStock || isNaN(productStock) || productStock < 0) {
            formErrors.productStock = 'El stock debe ser un número positivo.';
        }
        if (!seller) formErrors.seller = 'El vendedor es obligatorio.';
        if (!productImage) formErrors.productImage = 'Debes subir una imagen del producto.';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('category', productCategory || newCategory); // Usar newCategory si está definido
        formData.append('description', productDescription); // Añadir descripción
        formData.append('price', parseFloat(productPrice));
        formData.append('stock', parseInt(productStock, 10));
        formData.append('seller', seller);
        formData.append('photo', productImage);

        try {
            setMessage('Creando producto...');
            const response = await axios.post(PRODUCT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            if (response && response.status === 201) {
                addProduct(response.data);
                resetForm();
                setMessage('Producto creado exitosamente.');
            } else {
                setMessage('Error al crear el producto. Inténtalo nuevamente.');
                setErrors({ api: response.data });
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
            setMessage('Error al crear el producto. Inténtalo nuevamente.');
            setErrors({ api: 'Error al crear el producto. Inténtalo nuevamente.' });
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory || !newCategoryDescription) {
            setMessage('Por favor, completa el nombre y la descripción de la categoría.');
            return;
        }
        try {
            const newCategoryData = {
                name: newCategory,
                description: newCategoryDescription,
            };
            const response = await axios.post(CATEGORIES, newCategoryData);
            if (response.status === 201) {
                // Añadir la nueva categoría al estado actual de categorías
                setCategories([...categories, response.data]);
                setProductCategory(response.data.name); // Seleccionar la nueva categoría automáticamente
                setNewCategory('');
                setNewCategoryDescription('');
                setIsAddingCategory(false);
                setMessage('Categoría agregada exitosamente.');
            }
        } catch (error) {
            console.error('Error al agregar la categoría:', error);
        }
    };

    const resetForm = () => {
        setProductName('');
        setProductCategory('');
        setProductDescription(''); // Limpiar el campo de descripción
        setProductPrice('');
        setProductStock('');
        setProductImage(null);
        setSeller('');
        setMessage('');
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 mb-6 border rounded-lg shadow'>
            {message && <p className="text-red-500">{message}</p>}
            <CategoryForm
                productCategory={productCategory}
                setProductCategory={setProductCategory}
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



            <ProductDetails
                productName={productName}
                setProductName={setProductName}
                productPrice={productPrice}
                setProductPrice={setProductPrice}
                productStock={productStock}
                setProductStock={setProductStock}
                seller={seller}
                setSeller={setSeller}
                productImage={productImage}
                handleImageChange={handleImageChange}
                errors={errors}
            />
            {/* Descripción del producto */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Descripción del Producto</label>
                <textarea
                    className={`w-full p-2 border rounded ${errors.productDescription ? 'border-red-500' : ''}`}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Escribe una breve descripción del producto"
                    required
                />
                {errors.productDescription && <p className="text-red-500">{errors.productDescription}</p>}
            </div>
            <ButtonGreen
                backgroundColor="bg-green-500"
                textColor="text-white"
                type="submit"
            >
                Crear Producto
            </ButtonGreen>
            {Object.keys(errors).length > 0 && (
                <button
                    type="button"
                    onClick={resetForm}
                    className="mt-2 bg-red-500 text-white p-2 rounded"
                >
                    Limpiar Formulario
                </button>
            )}
        </form>
    );
}

export default CreateProductForm;
