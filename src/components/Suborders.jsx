import { useEffect, useState } from 'react';
import UseApi from '../services/useApi';
import { ORDER_SALES_URL } from '../config/urls'; 



const Suborders = () => {
    const [subOrders, setSubOrders] = useState([]);
    const { data, loading, error } = UseApi({ apiEndpoint: ORDER_SALES_URL }); 

    useEffect(() => {
        if (data) {
            setSubOrders(data);
        }
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
                            <p className="text-sm">
                                Comprado por: {sale.order_username} ({sale.order_email})
                            </p> 
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Suborders;
