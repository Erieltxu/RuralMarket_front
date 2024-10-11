import { useEffect } from "react";
import UseApi from "../../services/useApi";
import { CARTITEM } from "../../config/urls";
import { useCart } from "../../context/CartContext";

const CartItems = ({ cartId }) => {
  const { cartItems, setCartItems } = useCart();
  const {
    data: fetchedCartItems,
    loading,
    error,
  } = UseApi({ apiEndpoint: `${CARTITEM}?cart_id=${cartId}`, method: "GET" });

  useEffect(() => {
    if (fetchedCartItems && Array.isArray(fetchedCartItems)) {
      setCartItems(fetchedCartItems);
    }
  }, [fetchedCartItems, setCartItems]);

  if (loading) return <p>Cargando artículos del carrito...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div>
      <h3>Artículos del carrito</h3>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              ID del producto: {item.product_id}, Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay artículos en el carrito.</p>
      )}
    </div>
  );
};

export default CartItems;
