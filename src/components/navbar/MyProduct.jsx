import React, { useEffect, useState } from 'react';
import UseApi from '../../services/useApi';
import { PRODUCT, USER_DETAIL } from '../../config/urls';


import { useNavigate } from 'react-router-dom'; 



const MyProduct = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [user, setUser] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', stock: '', photo: '' });

    // Llamadas a la API para obtener productos y detalles del usuario
    const { data: productosData, loading: loadingProducts, error: errorProducts } = UseApi({ apiEndpoint: PRODUCT });
    const { data: userData, loading: loadingUser, error: errorUser } = UseApi({ apiEndpoint: USER_DETAIL });

    // Cargar datos del usuario
    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    // Filtrar productos del usuario
    useEffect(() => {
        if (user && productosData) {
            const userProducts = productosData.filter(producto => producto.seller === user.id);
            setProductos(userProducts);
        }
    }, [user, productosData]);

    // Manejo de errores y carga
    if (loadingProducts || loadingUser) {
        return <p>Cargando productos...</p>;
    }

    if (errorProducts) {
        console.error("Error al cargar productos:", errorProducts);
        return <p>Error al cargar productos: {errorProducts}</p>;
    }

    if (errorUser) {
        console.error("Error al cargar usuario:", errorUser);
        return <p>Error al cargar el usuario: {errorUser}</p>;
    }

    // Función para eliminar productos
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) return;

        try {
            // Realizar la llamada a la API para eliminar el producto
            const { error } = await UseApi({ apiEndpoint: `${PRODUCT}${id}/`, method: 'DELETE' });
            if (!error) {
                setProductos(prev => prev.filter(producto => producto.id !== id));
                alert("Producto eliminado con éxito");
            } else {
                alert("Hubo un error al eliminar el producto: " + error.message);
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Hubo un error al eliminar el producto");
        }
    };

    // Función para editar productos
    const handleEdit = (producto) => {
        setEditingProductId(producto.id);
        setFormData({
            name: producto.name,
            price: producto.price,
            stock: producto.stock,
            photo: producto.photo
        });
    };

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para guardar cambios
    const handleSave = async (id) => {
        try {
            // Realizar la llamada a la API para actualizar el producto
            const response = await UseApi({
                apiEndpoint: `${PRODUCT}${id}/`,
                method: 'PUT',
                body: formData
            });

            if (response.data) {
                setProductos(prev => prev.map(p => (p.id === id ? { ...p, ...formData } : p)));
                setEditingProductId(null);
                alert("Producto actualizado con éxito");
            } else {
                throw new Error("No se pudo actualizar el producto");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert("Hubo un error al actualizar el producto: " + error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Mis Productos</h2>
            {productos.length > 0 ? (
                <ul className="space-y-4">
                    {productos.map((producto) => (
                        <li key={producto.id} className="border p-4 rounded shadow">
                            {editingProductId === producto.id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full mb-2 px-2 py-1 border rounded"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full mb-2 px-2 py-1 border rounded"
                                    />
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full mb-2 px-2 py-1 border rounded"
                                    />
                                    <input
                                        type="text"
                                        name="photo"
                                        value={formData.photo}
                                        onChange={handleChange}
                                        className="w-full mb-2 px-2 py-1 border rounded"
                                    />
                                    <button onClick={() => handleSave(producto.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                                        Guardar
                                    </button>
                                    <button onClick={() => setEditingProductId(null)} className="bg-gray-500 text-white px-2 py-1 rounded ml-2">
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-bold">{producto.name}</h3>
                                    <p>Precio: {producto.price} €</p>
                                    <p>Cantidad: {producto.stock}</p>
                                    {producto.photo && <img src={producto.photo} alt={producto.name} className="w-full h-48 object-cover mb-3 rounded-md" />}
                                    <div className="flex space-x-2 mt-2">
                                        <button onClick={() => handleEdit(producto)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(producto.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            )}
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
