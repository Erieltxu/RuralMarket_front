import React, { useState, useEffect } from 'react';
import { PRODUCT, CATEGORIES, USER_DETAIL } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';
import ProductDetails from '../createProduct/ProductDetails';
import CategoryForm from '../createProduct/CategoryForm';
import UseApi from '../../services/UseApi';
import axios from 'axios';

function CreateProductForm({ addProduct }) {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [seller, setSeller] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    // Utiliza el hook UseApi para obtener la información del usuario logueado
    const { data: userData, loading: userLoading, error: userError } = UseApi({
        apiEndpoint: USER_DETAIL,
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });

    // Utiliza el hook UseApi para cargar las categorías desde la base de datos
    const { data: categories, loading: categoriesLoading, error: categoriesError } = UseApi({
        apiEndpoint: CATEGORIES,
    });

    useEffect(() => {
        if (userData) {
            setSeller(userData.id); // Establecer el ID del vendedor logueado
        }
    }, [userData]);

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const validateForm = () => {
        let formErrors = {};
        
        // Validar el nombre del producto
        if (!productName) formErrors.productName = 'El nombre del producto es obligatorio.';
    
        // Validar la categoría del producto
        if (!productCategory && !newCategory) formErrors.productCategory = 'Selecciona o agrega una categoría.';
    
        // Validar la descripción del producto
        if (!productDescription) formErrors.productDescription = 'La descripción del producto es obligatoria.';
    
        // Si la categoría no es "Servicios", validar precio y stock
        const isService = productCategory === 'Servicios' || newCategory === 'Servicios';
    
        if (!isService) {
            if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
                formErrors.productPrice = 'Introduce un precio válido.';
            }
            if (!productStock || isNaN(productStock) || productStock < 0) {
                formErrors.productStock = 'El stock debe ser un número positivo.';
            }
        }
    
        // Validar la imagen del producto
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
        formData.append('category', productCategory || newCategory);
        formData.append('description', productDescription);
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

            const response = await axios.post(CATEGORIES, newCategoryData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                const createdCategory = response.data;
                setProductCategory(createdCategory.id);
                setNewCategory('');
                setNewCategoryDescription('');
                setIsAddingCategory(false);
                setMessage('Categoría agregada exitosamente.');
            } else {
                setMessage('Error al agregar la categoría. Inténtalo nuevamente.');
            }
        } catch (error) {
            console.error('Error al agregar la categoría:', error.response?.data || error.message);
            setMessage(`Error al agregar la categoría: ${error.response?.data?.message || error.message}`);
        }
    };

    const resetForm = () => {
        setProductName('');
        setProductCategory('');
        setProductDescription('');
        setProductPrice('');
        setProductStock('');
        setProductImage(null);
        setSeller('');
        setMessage('');
        setErrors({});
    };

    if (userLoading || categoriesLoading) return <p>Cargando...</p>;
    if (userError || categoriesError) return <p>Error al cargar datos: {userError?.message || categoriesError?.message}</p>;

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 mb-6 border rounded-lg shadow mt-10'>
            {message && <p className="text-red-500">{message}</p>}

            {/* Campo oculto para el ID del vendedor */}
            <input type="hidden" value={seller} name="seller" />

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
                backgroundColor="bg-customGreen"
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
