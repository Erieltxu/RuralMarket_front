import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { PRODUCT, USER_DETAIL } from '../../config/urls';


import { useNavigate } from 'react-router-dom'; 


const MyProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    const { data: productsData, loading: loadingProducts, error: errorProducts } = UseApi({ apiEndpoint: PRODUCT });
    const { data: userData, loading: loadingUser, error: errorUser } = UseApi({ apiEndpoint: USER_DETAIL });

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    useEffect(() => {
        if (user && productsData) {
            const userProducts = productsData.filter(product => product.seller === user.id);
            setProducts(userProducts);
        }
    }, [user, productsData]);

    if (loadingProducts || loadingUser) {
        return <p>Cargando productos...</p>;
    }

    if (errorProducts) {
        return <p>Error al cargar productos: {errorProducts.message}</p>;
    }

    if (errorUser) {
        return <p>Error al cargar usuario: {errorUser.message}</p>;
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) return;

        try {
            await UseApi({ apiEndpoint: `${PRODUCT}${id}/`, method: 'DELETE' });
            setProducts(prev => prev.filter(product => product.id !== id));
            alert("Producto eliminado con éxito");
        } catch (error) {
            alert("Hubo un error al eliminar el producto");
        }
    };

    const handleEdit = (id) => {
        navigate(`/editar-producto/${id}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Mis Productos</h2>
            {products.length > 0 ? (
                <ul className="space-y-4">
                    {products.map((product) => (
                        <li key={product.id} className="border p-4 rounded shadow">
                            <h3 className="font-bold">{product.name}</h3>
                            <p>Precio: {product.price} €</p>
                            <p>Cantidad: {product.stock}</p>
                            {product.photo && <img src={product.photo} alt={product.name} className="w-full h-40 object-cover mb-3 rounded-md cursor-pointer" />}
                            <div className="flex space-x-2 mt-2">
                                <button onClick={() => handleEdit(product.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No has subido productos aún.</p>
            )}
        </div>
    );
};

export default MyProducts;

