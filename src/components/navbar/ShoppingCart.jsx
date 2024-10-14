import { useEffect, useState } from "react";
import UseApi from "../../services/useApi";
import { CART } from "../../config/urls";

const ShoppingCart = () => {
  const { data: cartData, error, loading } = UseApi({ apiEndpoint: CART });
  const [totalItems, setTotalItems] = useState(0);

  const calculateCartItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (error) {
      console.error("Error al cargar el carrito:", error);
      return;
    }

    if (cartData && cartData.length > 0 && cartData[0].items) {
      const totalItemsCount = calculateCartItems(cartData[0].items);
      setTotalItems(totalItemsCount);
    } else {
      setTotalItems(0);
    }
  }, [cartData, error]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="relative flex items-center">
      <div className="relative">
        <img
          src="../../../public/img/cart.svg"
          alt="Cart Icon"
          className="h-6 w-6 mr-4 text-black"
          style={{ color: "#000000" }}
        />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
