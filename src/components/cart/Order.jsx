import React, { useEffect } from 'react';
import UseApi from '../../services/useApi';

const Order = () => {
    const { data: orderData, loading, error } = UseApi({ apiEndpoint: '/api/cart/cart/', method: 'GET' });

    useEffect(() => {
        console.log('Datos de la orden:', orderData);
    }, [orderData]);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error al cargar la orden: {error.message}</p>;

    // Asegurarse de que orderData tenga el formato correcto
    const items = orderData && orderData.length > 0 ? orderData[0]?.items : []; // Se asegura de que items no sea null

    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0).toFixed(2);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Recibo</h2>
            {items.length > 0 ? (
                <div>
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                            <div>
                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">{(item.quantity * item.product.price).toFixed(2)} €</p>
                        </div>
                    ))}
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">Total: {totalAmount} €</h3>
                    </div>
                    <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                        Pagar
                    </button>
                </div>
            ) : (
                <p className="text-gray-600">No hay productos en la orden.</p>
            )}
        </div>
    );
};

export default Order;
