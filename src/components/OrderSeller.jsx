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
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <p>No tienes pedidos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg shadow-md p-4">
              <h2 className="font-bold text-lg">ID del pedido: {order.id}</h2>
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
              <p className="text-sm">
                Comprado por: {order.username} ({order.email})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSeller;
