import { useEffect, useState } from "react";
import UseApi from "../services/useApi";
import { ORDER_SELLER_URL } from "../config/urls";

const OrderSeller = () => {
    const [orders, setOrders] = useState([]);
    const { data, loading, error } = UseApi({ apiEndpoint: ORDER_SELLER_URL });

    useEffect(() => {
        if (data) {
            setOrders(data);
        }
    }, [data]);

    if (loading) return <p>Cargando pedidos...</p>;
    if (error) return <p>Error al cargar pedidos.</p>;

    return (
        <div className="px-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Mis Pedidos</h1>
            {orders.length === 0 ? (
                <p>No tienes pedidos.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex flex-row justify-between items-start border rounded-lg shadow-md p-4 bg-white"
                        >
                            <div className="w-1/3">
                                <h2 className="font-bold text-lg mb-2">
                                    ID del pedido: {order.id}
                                </h2>
                                <p className="text-sm">
                                    Total:{" "}
                                    {typeof order.total === "number"
                                        ? order.total.toFixed(2)
                                        : parseFloat(order.total).toFixed(2)}{" "}
                                    €
                                </p>
                                <p className="text-sm">
                                    Fecha: {new Date(order.order_date).toLocaleString()}
                                </p>
                                <p className="text-sm">Estado: {order.status}</p>
                                <p className="text-sm mb-4">
                                    Comprado por: {order.username} ({order.email})
                                </p>
                            </div>

                            <div className="w-2/3 flex flex-wrap">
                                {order.suborders.map((suborder) => (
                                    <div
                                        key={suborder.id}
                                        className="w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0 border-l-2 pl-4"
                                    >
                                        <h3 className="font-semibold">
                                            ID Suborden: {suborder.id}
                                        </h3>
                                        <p className="text-sm">
                                            Vendido por: {suborder.seller_name || "Desconocido"}
                                        </p>
                                        <p className="text-sm">Subtotal: {suborder.subtotal} €</p>
                                        <p className="text-sm">Estado: {suborder.status}</p>

                                        <div className="mt-2">
                                            <h4 className="font-semibold">Productos:</h4>
                                            {suborder.products.length > 0 ? (
                                                suborder.products.map((product) => (
                                                    <div key={product.product_id} className="ml-4 mt-2">
                                                        <p className="text-sm">
                                                            Producto: {product.product_name}
                                                        </p>
                                                        <p className="text-sm">
                                                            Cantidad: {product.quantity}
                                                        </p>
                                                        <p className="text-sm">
                                                            Precio de compra: {product.sold_price} €
                                                        </p>
                                                        <p className="text-sm">
                                                            Vendedor: {product.seller_name || "Desconocido"}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm">
                                                    No hay productos en esta suborden.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderSeller;