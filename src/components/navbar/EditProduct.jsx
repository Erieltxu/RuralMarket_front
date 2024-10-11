import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseApi from '../../services/useApi'; // Asegúrate de que esta importación sea correcta
import { PRODUCT } from '../../config/urls'; // Asegúrate de que esta importación sea correcta

const EditProduct = () => {
    const { id } = useParams(); // Obtiene el ID del producto desde la URL
    const navigate = useNavigate(); // Hook para navegar entre rutas
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        photo: ''
    });

    // Llama a la API para obtener los datos del producto
    const { data: productData, loading, error } = UseApi({ apiEndpoint: `${PRODUCT}${id}/` });

    useEffect(() => {
        if (productData) {
            // Almacena los datos del producto en el estado
            setProduct({
                name: productData.name,
                price: productData.price,
                stock: productData.stock,
                photo: productData.photo
            });
        }
    }, [productData]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    // Maneja el evento de guardar cambios
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obtiene el token de localStorage

            const response = await fetch(`${PRODUCT}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Configura la cabecera de autorización
                },
                body: JSON.stringify(product), // Convierte el producto a formato JSON
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto'); // Lanza error si la respuesta no es válida
            }

            alert('Producto actualizado con éxito'); // Muestra mensaje de éxito
            navigate('/mis-productos'); // Redirige a la lista de productos
        } catch (err) {
            console.error("Error al actualizar el producto:", err); // Muestra error en consola
            alert('Error al actualizar el producto'); // Muestra mensaje de error
        }
    };

    // Muestra un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <p>Cargando producto...</p>;
    }

    // Muestra un mensaje de error si hubo un problema al cargar el producto
    if (error) {
        console.error("Error al cargar el producto:", error);
        return <p>Error al cargar el producto: {error.message}</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Editar Producto</h2>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block mb-1">Nombre:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={product.name} 
                        onChange={handleChange} 
                        className="border w-full p-2 rounded" 
                    />
                </div>
                <div>
                    <label className="block mb-1">Precio:</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        className="border w-full p-2 rounded" 
                    />
                </div>
                <div>
                    <label className="block mb-1">Cantidad:</label>
                    <input 
                        type="number" 
                        name="stock" 
                        value={product.stock} 
                        onChange={handleChange} 
                        className="border w-full p-2 rounded" 
                    />
                </div>
                <div>
                    <label className="block mb-1">URL de la foto:</label>
                    <input 
                        type="text" 
                        name="photo" 
                        value={product.photo} 
                        onChange={handleChange} 
                        className="border w-full p-2 rounded" 
                    />
                </div>
                <div className="flex space-x-2">
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Guardar Cambios
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/mis-productos')} 
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
