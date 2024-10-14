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
        <div className="max-w-7xl mx-auto p-4 mt-10 ml-6 mr-6"> 
            <h2 className="text-2xl font-bold mb-4">Mis Productos</h2> 
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"> 
                    {products.map((product) => (
                        <div key={product.id} className="border p-2 rounded shadow flex flex-col justify-between h-full w-full">
                            <div>
                                <h3 className="font-bold mb-2 min-h-[3rem]">
                                    {product.name}
                                </h3>
                                {product.photo && (
                                    <img
                                        src={product.photo}
                                        alt={product.name}
                                        className="w-full h-40 object-cover mb-3 rounded-md cursor-pointer"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <p className="mb-2">Precio: {product.price} €</p>
                                <p className="mb-2">Cantidad: {product.stock}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        className="bg-customGreen text-white px-2 py-1 rounded w-full"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded w-full"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No has subido productos aún.</p>
            )}
        </div>
    );
};

export default MyProducts;
