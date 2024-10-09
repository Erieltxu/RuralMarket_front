import { useEffect, useState } from 'react';
import UseApi from '../services/useApi';
import axios from 'axios';
import { ORDER_SALES_URL, PRODUCT_SALES_URL } from '../config/urls';

const Suborders = () => {
    const [subOrders, setSubOrders] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const { data, loading, error } = UseApi({ apiEndpoint: ORDER_SALES_URL });

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                console.log("Datos de suborden:", data); // Ver los datos de suborden
                setSubOrders(data);
                
                const token = localStorage.getItem('token');
                console.log("Token de autenticación:", token);

                if (!token) {
                    console.error("Error: No hay token de autenticación disponible.");
                    return;
                }

                try {
                    // Llamar a la API de productos de suborden
                    const productResponses = await Promise.all(data.map(async suborder => {
                        console.log("Solicitando productos para la suborden ID:", suborder.id);
                        const response = await axios.get(`${PRODUCT_SALES_URL}?suborder=${suborder.id}`, {
                            headers: {
                                Authorization: `Token ${token}`  // Token de autenticación
                            }
                        });
                        console.log("Respuesta de productos:", response.data); // Ver la respuesta
                        return response.data;
                    }));

                    // Procesar los datos de productos
                    const productsMapped = {};
                    productResponses.flat().forEach(item => {
                        const suborderId = item.suborder;  // ID de la suborden
                        const productId = item.product;    // ID del producto
                        const productName = item.product_name; // Nombre del producto
                        const quantity = item.quantity;    // Cantidad del producto
                        const soldPrice = item.sold_price; // Precio vendido

                        if (!productsMapped[suborderId]) {
                            productsMapped[suborderId] = [];
                        }

                        productsMapped[suborderId].push({
                            id: productId,
                            name: productName,
                            quantity: quantity,
                            soldPrice: parseFloat(soldPrice).toFixed(2)  // Asegura dos decimales
                        });
                    });

                    setProductDetails(productsMapped); // Guarda los detalles en el estado

                } catch (error) {
                    console.error("Error fetching products:", error.response?.data || error.message);
                }
            }
        };

        fetchData();
    }, [data]);

    if (loading) return <p>Cargando ventas...</p>;
    if (error) return <p>Error al cargar ventas.</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Mis Ventas</h1>
            {subOrders.length === 0 ? (
                <p>No tienes ventas registradas.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subOrders.map(sale => (
                        <div key={sale.id} className="border rounded-lg shadow-md p-4">
                            <h2 className="font-bold text-lg">ID de la venta: {sale.id}</h2> 
                            <p className="text-sm">Subtotal: {(typeof sale.subtotal === 'number' ? sale.subtotal.toFixed(2) : parseFloat(sale.subtotal).toFixed(2))} €</p> 
                            <p className="text-sm">Estado: {sale.status}</p>
                            <p className="text-sm">Comprado por: {sale.order_username} ({sale.order_email})</p> 
                            <p className="text-sm">Productos vendidos:</p>

                            {productDetails[sale.id] && productDetails[sale.id].length > 0 ? (
                                <ul>
                                    {productDetails[sale.id].map(product => (
                                        <li key={product.id}>
                                            Producto: {product.name}, Cantidad: {product.quantity}, Precio vendido: {product.soldPrice} €
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay productos asociados.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Suborders;
