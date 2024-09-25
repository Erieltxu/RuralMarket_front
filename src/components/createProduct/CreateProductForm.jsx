import React, { useState } from 'react';
import UseApi from '../../services/useApi';
import { PRODUCT } from '../../config/urls';

function CreateProductForm({ addProduct, sellerId }) {  // Agregamos sellerId como prop
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const { data, loading, error, callApi } = UseApi({
        apiEndpoint: PRODUCT,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    // Validación del formulario
    const validateForm = () => {
        let formErrors = {};
        if (!productName) formErrors.productName = 'El nombre del producto es obligatorio.';
        if (!productCategory) formErrors.productCategory = 'Selecciona una categoría.';
        if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
            formErrors.productPrice = 'Introduce un precio válido.';
        }
        if (!productStock || isNaN(productStock) || productStock < 0) {
            formErrors.productStock = 'El stock debe ser un número positivo.';
        }
        if (!productImage) formErrors.productImage = 'La imagen del producto es obligatoria.';

        return formErrors;
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('category', productCategory);
        formData.append('description', productDescription);
        formData.append('price', parseFloat(productPrice));
        formData.append('stock', parseInt(productStock, 10));
        formData.append('photo', productImage);
        formData.append('seller', sellerId);  // Agregamos el seller ID

        try {
            const response = await callApi({ body: formData });
            
            if (loading) {
                setMessage('Creando producto...');
            }

            if (response && !error) {
                addProduct(response); // Actualiza la lista de productos con el nuevo producto
                resetForm();
                setMessage('Producto creado exitosamente.');
            }
        } catch (apiError) {
            // Si hay errores desde el backend (API), muestra esos errores
            setMessage('Error al crear el producto. Inténtalo nuevamente.');
            setErrors({ api: apiError.message });
        }
    };

    const resetForm = () => {
        setProductName('');
        setProductCategory('');
        setProductDescription('');
        setProductPrice('');
        setProductStock('');
        setProductImage(null);
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mb-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Añadir Producto</h2>
            
            {/* Mostrar mensajes de error generales */}
            {message && <p className="text-green-500">{message}</p>}
            {errors.general && <p className="text-red-500">{errors.general}</p>}

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nombre del producto</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.productName ? 'border-red-500' : ''}`}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Categoría</label>
                <select
                    className={`w-full p-2 border rounded ${errors.productCategory ? 'border-red-500' : ''}`}
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Verduras">Verduras</option>
                </select>
                {errors.productCategory && <p className="text-red-500">{errors.productCategory}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Precio</label>
                <input
                    type="number"
                    className={`w-full p-2 border rounded ${errors.productPrice ? 'border-red-500' : ''}`}
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
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
                    required
                />
                {errors.productStock && <p className="text-red-500">{errors.productStock}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Descripción</label>
                <textarea
                    className="w-full p-2 border rounded"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagen del producto</label>
                <input
                    type="file"
                    accept="image/*"
                    className={`w-full p-2 border rounded ${errors.productImage ? 'border-red-500' : ''}`}
                    onChange={handleImageChange}
                />
                {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Crear Producto
            </button>
            {message && <p>{message}</p>}
            {errors.api && <p style={{ color: 'red' }}>{errors.api}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default CreateProductForm;
