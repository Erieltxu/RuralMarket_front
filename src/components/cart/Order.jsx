import { useEffect, useState } from "react";
import UseApi from "../../services/useApi";
import { CART, ORDERS_URL } from "../../config/urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Spinner from "./Spinner";

const Order = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems, setCartItems } = useCart();
  const { data: cartData, loading, error } = UseApi({ apiEndpoint: CART });
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartData && cartData.length > 0 && cartData[0].items) {
      const totalAmount = cartData[0].items.reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.product.price);
      }, 0);
      setTotal(totalAmount);

      if (!cartItems || cartItems.length === 0) {
        setCartItems(cartData[0].items);
      }
    }
  }, [cartData, cartItems, setCartItems]);

  const handleSendOrder = async () => {
    if (cartData && cartData[0] && cartData[0].items) {
      const cartItemsToSend = cartData[0].items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));

      setIsSubmitting(true);
      try {
        const response = await axios.post(
          ORDERS_URL,
          {
            cart_items: cartItemsToSend,
            total: total.toFixed(2),
            cart: cartData[0].id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Pedido enviado:", response.data);

        clearCart();

        navigate("/confirmation");
      } catch (error) {
        console.error(
          "Error al enviar el pedido:",
          error.response?.data || error
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar la orden</p>;

  const items = cartData?.length > 0 ? cartData[0].items : [];

  return (
    <div className="max-w-lg mx-auto mb-24 mt-24">
      <div className="bg-white shadow-md rounded-lg p-8 border-2 border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Recibo de compra
        </h2>

        {items && items.length > 0 ? (
          <>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-gray-800 font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500">Cantidad: {item.quantity}</p>
                    <p className="text-gray-500">
                      Precio unitario: €
                      {parseFloat(item.product.price).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-gray-800 font-bold">
                    Subtotal: €
                    {(item.quantity * parseFloat(item.product.price)).toFixed(
                      2
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                Total: €{total.toFixed(2)}
              </h3>
            </div>
            <div className="mt-4 flex justify-center text-center">
              <button
                onClick={handleSendOrder}
                className="bg-customGreen text-white px-4 py-2 rounded flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner />}
                <span className={`ml-2 ${isSubmitting ? "text-center" : ""}`}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </span>
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-center">
            No hay productos en la orden.
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;
