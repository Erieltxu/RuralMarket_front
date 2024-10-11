import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCT, CATEGORIES, USERS, CART, CARTITEM } from "../../config/urls";
import UseApi from "../../services/useApi";
import ProductCard from "./ProductCard";
import axios from "axios";
import PopUp from "../PopUp";

function ProductStore() {
  const [searchParams] = useSearchParams();
  const sellerIdFromUrl = searchParams.get("seller");
  const searchQueryFromUrl = searchParams.get("search");
  const [searchTerm, setSearchTerm] = useState(searchQueryFromUrl || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeller, setSelectedSeller] = useState(sellerIdFromUrl || "");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");

  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApi({ apiEndpoint: PRODUCT });
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = UseApi({ apiEndpoint: CATEGORIES });
  const {
    data: sellers,
    loading: loadingSellers,
    error: errorSellers,
  } = UseApi({ apiEndpoint: USERS });

  const authenticated = !!localStorage.getItem("token");

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAddToCart = async (product, quantity) => {
    console.log("Intentando añadir producto:", product, "Cantidad:", quantity);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setPopupMessage("Inicia sesión para usar el carrito de compras");
        setPopupType("error");
        setShowPopup(true);
        return;
      }

      let cartId = localStorage.getItem("cartId");
      console.log("Cart ID:", cartId);

      if (!cartId) {
        try {
          const cartResponse = await axios.get(CART, {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          });

          console.log("Respuesta del carrito:", cartResponse.data);
          if (cartResponse.data && cartResponse.data.length > 0) {
            cartId = cartResponse.data[0].id;
            localStorage.setItem("cartId", cartId);
          } else {
            console.error(
              "No se encontró un carrito existente. Creando uno nuevo..."
            );
            const newCartResponse = await axios.post(
              CART,
              {},
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            cartId = newCartResponse.data.id;
            localStorage.setItem("cartId", cartId);
          }
        } catch (error) {
          console.error(
            "Error al obtener el carrito existente:",
            error.response?.data || error
          );
          setPopupMessage("Error al obtener el carrito existente");
          setPopupType("error");
          setShowPopup(true);
          return;
        }
      }

      const cartItem = {
        product_id: product.id,
        quantity,
        cart_id: cartId,
      };

      await axios.post(CARTITEM, cartItem, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPopupMessage("Producto agregado al carrito con éxito");
      setPopupType("success");
      setShowPopup(true);
      console.log("Producto añadido al carrito");
    } catch (error) {
      console.error(
        "Error al añadir producto al carrito:",
        error.response?.data || error
      );
      setPopupMessage("Error al añadir producto al carrito");
      setShowPopup(true);
    }
  };

  if (loadingProducts || loadingCategories || loadingSellers)
    return <p>Cargando productos, categorías y vendedoras...</p>;
  if (errorProducts || errorCategories || errorSellers)
    return (
      <p>
        Error al cargar datos:{" "}
        {errorProducts || errorCategories || errorSellers}
      </p>
    );

  const filteredProducts =
    products?.filter((product) => {
      const productName = product.name ? product.name.toLowerCase().trim() : "";
      const searchQuery = searchTerm ? searchTerm.toLowerCase().trim() : "";
      const matchesSearchTerm = productName.includes(searchQuery);
      const matchesCategory =
        selectedCategory === "" || product.category_name === selectedCategory;
      const matchesSeller =
        selectedSeller === "" || product.seller === parseInt(selectedSeller);
      const matchesProvince =
        selectedProvince === "" ||
        sellers.find((seller) => seller.id === product.seller)?.province ===
          selectedProvince;
      return (
        matchesSearchTerm && matchesCategory && matchesSeller && matchesProvince
      );
    }) || [];

  const provinces = Array.from(
    new Set(sellers?.map((seller) => seller.province))
  );

  return (
    <div className="max-w-7xl mx-auto p-4 mt-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Catálogo de Productos y Servicios
        </h1>
      </div>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-1/4 p-2 border rounded-md mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/6 pr-4 mb-4 md:mb-0 ml-4">
          <label htmlFor="category" className="block font-bold mb-2">
            Filtrar por categoría
          </label>
          <select
            id="category"
            className="w-full p-1 border rounded-md mb-4"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>

          <label htmlFor="seller" className="block font-bold mb-2">
            Filtrar por vendedora
          </label>
          <select
            id="seller"
            className="w-full p-1 border rounded-md mb-4"
            value={selectedSeller}
            onChange={(e) => setSelectedSeller(e.target.value)}
          >
            <option value="">Todas las vendedoras</option>
            {sellers &&
              sellers
                .filter((seller) => seller.user_type === "seller")
                .map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.first_name}
                  </option>
                ))}
          </select>

          <label htmlFor="province" className="block font-bold mb-2">
            Filtrar por provincia
          </label>
          <select
            id="province"
            className="w-full p-1 border rounded-md"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">Todas las provincias</option>
            {provinces &&
              provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full md:w-5/6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <p>
              No se encontraron productos que coincidan con los criterios de
              búsqueda.
            </p>
          )}
        </div>
      </div>

      {showPopup && (
        <PopUp
          message={popupMessage}
          type={authenticated ? "success" : "error"}
          onClose={handlePopupClose}
          showCreateAccountButton={!authenticated}
        />
      )}
    </div>
  );
}

export default ProductStore;
