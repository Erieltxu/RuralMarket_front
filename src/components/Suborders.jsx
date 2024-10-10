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
                setSubOrders(data);

                const token = localStorage.getItem('token'); 
                if (!token) return;

                try {
                    
                    const response = await axios.get(PRODUCT_SALES_URL, {
                        headers: { Authorization: `Token ${token}` },
                    });

                    const products = response.data;

                  
                    const mappedProducts = {};
                    products.forEach(product => {
                        const { suborder, product_name, quantity, sold_price } = product;
                        if (!mappedProducts[suborder]) {
                            mappedProducts[suborder] = [];
                        }
                        mappedProducts[suborder].push({
                            product_name,
                            quantity,
                            sold_price,
                        });
                    });

                  
                    setProductDetails(mappedProducts);
                } catch (error) {
                    console.error("Error fetching products:", error.response?.data || error.message);
                }
            }
        };

        fetchData();
    }, [data]);

    if (loading) return <p className="text-center text-lg font-medium">Cargando ventas...</p>;
    if (error) return <p className="text-center text-red-500 text-lg font-medium">Error al cargar ventas.</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Mis Ventas</h1>
            {subOrders.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No tienes ventas registradas.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subOrders.map((sale) => (
                        <div key={sale.id} className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
                            <h2 className="font-bold text-xl mb-2">ID de la venta: {sale.id}</h2>
                            <p className="text-gray-700 text-md mb-1">Subtotal: <span className="font-semibold">{parseFloat(sale.subtotal).toFixed(2)} €</span></p>
                            <p className="text-gray-700 text-md mb-1">Estado: <span className="font-semibold">{sale.status}</span></p>
                            <p className="text-gray-700 text-md mb-1">Comprado por: <span className="font-semibold">{sale.order_username} ({sale.order_email})</span></p>

                            {productDetails[sale.id] && productDetails[sale.id].length > 0 ? (
                                <ul>
                                    {productDetails[sale.id].map((product, index) => (
                                        <li key={`${product.product_name}-${index}`} className="text-gray-700 text-md mb-1">
                                            <span className="text-gray-700 text-md mb-1">Producto:</span> <span className="font-semibold">{product.product_name}</span>
                                            <br />
                                            <span className="text-gray-700 text-md mb-1">Cantidad:</span> <span className="font-semibold">{product.quantity}</span>
                                            <br />
                                            <span className="text-gray-700 text-md mb-1">Precio vendido:</span> <span className="font-semibold">{product.sold_price} €</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 text-md">No hay productos asociados.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Suborders;
