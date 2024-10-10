import React, { useState, useEffect } from 'react';
import { PRODUCT, CATEGORIES, USER_DETAIL } from '../../config/urls';
import ButtonGreen from '../ButtonGreen';
import ProductDetails from '../createProduct/ProductDetails';
import CategoryForm from '../createProduct/CategoryForm';
import UseApi from '../../services/UseApi';
import axios from 'axios';

const CreateProductForm = ({ addProduct }) => {
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


    const { data: userData, loading: userLoading, error: userError } = UseApi({
        apiEndpoint: USER_DETAIL,
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });


    const { data: categories, loading: categoriesLoading, error: categoriesError } = UseApi({
        apiEndpoint: CATEGORIES,
    });

    useEffect(() => {
        if (userData) {
            setSeller(userData.id);
        }
    }, [userData]);

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const validateForm = () => {
        let formErrors = {};

        if (!productName) formErrors.productName = 'El nombre del producto es obligatorio.';

        if (!productCategory && !newCategory) formErrors.productCategory = 'Selecciona o agrega una categoría.';

        if (!productDescription) formErrors.productDescription = 'La descripción del producto es obligatoria.';

        const isService = productCategory === 'Servicios' || newCategory === 'Servicios';

        if (!isService) {

            if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
                formErrors.productPrice = 'El precio debe ser mayor que 0.';
            }

            if (!productStock || isNaN(productStock) || productStock < 0) {
                formErrors.productStock = 'El stock debe ser mayor o igual a 0.';
            }
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
        formData.append('category', productCategory || newCategory);
        formData.append('description', productDescription);


        const isService = productCategory === 'Servicios' || newCategory === 'Servicios';

        if (isService) {
            formData.append('price', 1);
            formData.append('stock', productStock === "1" ? 1 : 0);
        } else {
            formData.append('price', parseFloat(productPrice));
            formData.append('stock', parseInt(productStock, 10));
        }

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
                console.log('Producto creado:', response.data);
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


            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nombre del Producto</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.productName ? 'border-red-500' : ''}`}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                />
                {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>

            {/* Campo para el precio */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Precio</label>
                    <input
                        type="number"
                        className={`w-full p-2 border rounded ${errors.productPrice ? 'border-red-500' : ''}`}
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Precio del producto"
                        required
                        min="0" 
                        step="0.01" 
                    />
                    {errors.productPrice && <p className="text-red-500">{errors.productPrice}</p>}
                </div>


           
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Stock</label>
                    <input
                        type="number"
                        className={`w-full p-2 border rounded ${errors.productStock ? 'border-red-500' : ''}`}
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                        placeholder="Stock del producto"
                        required
                        min="0"  
                    />
                    {errors.productStock && <p className="text-red-500">{errors.productStock}</p>}
                </div>


           
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


            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagen del Producto</label>
                <input
                    type="file"
                    className="w-full p-2 border rounded"
                    onChange={handleImageChange}
                    required
                />
                {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
            </div>


            <ButtonGreen
                backgroundColor="bg-customGreen"
                textColor="text-white"
                type="submit"
            >
                Crear Producto
            </ButtonGreen>
        </form>
    );
};

export default CreateProductForm;
