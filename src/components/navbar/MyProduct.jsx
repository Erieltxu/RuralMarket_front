import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { PRODUCT, USER_DETAIL } from '../../config/urls';




const MyProduct = () => {
    const [productos, setProductos] = useState([]);
    const [user, setUser] = useState(null);
    const { data: productosData, loading: loadingProducts, error: errorProducts } = UseApi({ apiEndpoint: PRODUCT });
    const { data: userData, loading: loadingUser, error: errorUser } = UseApi({ apiEndpoint: USER_DETAIL });

    useEffect(() => {
        // Al obtener los datos del usuario, guardarlos en el estado
        if (userData) {
            setUser(userData); // Guarda el usuario en el estado
            console.log('Usuario:', userData); // Verifica que se está guardando el usuario
        }
    }, [userData]);

    useEffect(() => {
        // Filtra los productos basados en el ID del vendedor
        if (user && productosData) {
            const userProducts = productosData.filter(producto => producto.seller === user.id); // Compara con el ID del vendedor
            setProductos(userProducts);
            console.log('Productos de usuario:', userProducts); // Muestra los productos filtrados
        }
    }, [user, productosData]);

    if (loadingProducts || loadingUser) {
        return <p>Cargando productos...</p>;
    }

    if (errorProducts) {
        return <p>Error al cargar productos: {errorProducts.message}</p>;
    }

    if (errorUser) {
        return <p>Error al cargar el usuario: {errorUser.message}</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Mis Productos</h2>
            {productos.length > 0 ? (
                <ul className="space-y-4">
                    {productos.map((producto) => (
                        <li key={producto.id} className="border p-4 rounded shadow">
                            <h3 className="font-bold">{producto.name}</h3>
                            <p>Precio: {producto.price} €</p>
                            <p>Cantidad: {producto.stock}</p>
                            {producto.photo && <img src={producto.photo} alt={producto.name} className="w-full h-auto" />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No has subido productos aún.</p>
            )}
        </div>
    );
};

export default MyProduct;
