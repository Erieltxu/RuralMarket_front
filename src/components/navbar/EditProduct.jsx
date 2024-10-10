import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseApi from '../../services/useApi';
import { PRODUCT } from '../../config/urls';

const EditProduct = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        photo: '',
    });

    // Llamada a la API para obtener el producto
    const { data, loading, error } = UseApi({ apiEndpoint: `${PRODUCT}${id}/` });

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);

    // Manejar el envío del formulario
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Llama a UseApi para actualizar el producto
            await UseApi({ apiEndpoint: `${PRODUCT}${id}/`, method: 'PUT', body: product });
            alert('Producto actualizado con éxito');
            navigate('/mis-productos'); // Redirigir a la lista de productos
        } catch (err) {
            console.error("Error al actualizar el producto:", err);
            alert('Error al actualizar el producto');
        }
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    // Manejar el botón de cancelar
    const handleCancel = () => {
        navigate('/mis-productos'); // Navega a la lista de productos
    };

    // Mostrar mensajes de carga y error
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar el producto: {error.message}</p>;

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={handleSave} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block mb-1">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">
                        Precio:
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">
                        Cantidad:
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">
                        URL de la foto:
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="photo"
                            value={product.photo}
                            onChange={handleChange}
                            placeholder="Introduce la URL de la foto"
                            className="border border-gray-300 p-2 flex-grow rounded"
                        />
                        <button
                            type="button"
                            onClick={() => alert('Funcionalidad de cargar imagen aún no implementada')}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Añadir Foto
                        </button>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Guardar Cambios
                    </button>
                    <button 
                        type="button" 
                        onClick={handleCancel} 
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;

