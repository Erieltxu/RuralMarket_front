import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseApi from '../../services/useApi'; 
import { PRODUCT } from '../../config/urls'; 

const EditProduct = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        photo: ''
    });

    
    const { data: productData, loading, error } = UseApi({ apiEndpoint: `${PRODUCT}${id}/` });

    useEffect(() => {
        if (productData) {
            
            setProduct({
                name: productData.name,
                price: productData.price,
                stock: productData.stock,
                photo: productData.photo
            });
        }
    }, [productData]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); 

            const response = await fetch(`${PRODUCT}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(product), 
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto'); 
            }

            alert('Producto actualizado con éxito'); 
            navigate('/mis-productos'); 
        } catch (err) {
            console.error("Error al actualizar el producto:", err); 
            alert('Error al actualizar el producto'); 
        }
    };

    
    if (loading) {
        return <p>Cargando producto...</p>;
    }


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
