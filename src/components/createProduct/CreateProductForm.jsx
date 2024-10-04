import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT, CATEGORIES } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';
import ProductDetails from '../createProduct/ProductDetails';
import CategoryForm from '../createProduct/CategoryForm';

function CreateProductForm({ addProduct }) {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
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
        setProductImage(e.target.files[0]); // Manejar la selección de la imagen
    };

    const validateForm = () => {
        let formErrors = {};
        if (!productName) formErrors.productName = 'El nombre del producto es obligatorio.';
        if (!productCategory) formErrors.productCategory = 'Selecciona o agrega una categoría.';
        if (!productPrice || isNaN(productPrice.replace(',', '.')) || parseFloat(productPrice.replace(',', '.')) <= 0) {
            formErrors.productPrice = 'Introduce un precio válido.';
        }
        if (!productStock || isNaN(productStock) || productStock < 0) {
            formErrors.productStock = 'El stock debe ser un número positivo.';
        }
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
        formData.append('category', productCategory); // ID de la categoría
        formData.append('description', productDescription);
        formData.append('price', parseFloat(productPrice.replace(',', '.'))); // Asegúrate de que sea un número
        formData.append('stock', parseInt(productStock, 10)); // Asegúrate de que sea un número
        formData.append('photo', productImage); // Envía la imagen

        try {
            setMessage('Creando producto...');
            const response = await axios.post(PRODUCT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            if (response && response.status === 201) {
                addProduct(response.data); // Añadir el producto creado a la lista
                resetForm(); // Reiniciar el formulario
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
                setCategories([...categories, response.data]); // Añadir la nueva categoría al estado actual
                setProductCategory(response.data.id); // Seleccionar la nueva categoría automáticamente
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
        setProductDescription('');
        setProductPrice('');
        setProductStock('');
        setProductImage(null);
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
                productImage={productImage}
                handleImageChange={handleImageChange}
                errors={errors}
            />

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
};

export default CreateProductForm;
