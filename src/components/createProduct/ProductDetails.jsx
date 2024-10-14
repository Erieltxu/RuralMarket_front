function ProductDetails({
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  productStock,
  setProductStock,
  productImage,
  handleImageChange,
  errors,
  productCategory,
}) {
  const isServiceCategory = productCategory === "4";

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
          Nombre del Producto
        </label>
        <input
          type="text"
          className={`w-full p-2 border rounded ${
            errors.productName ? "border-red-500" : ""
          }`}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre del producto"
          required
        />
        {errors.productName && (
          <p className="text-red-500">{errors.productName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Precio</label>
        <input
          type="text"
          className={`w-full p-2 border rounded ${
            errors.productPrice ? "border-red-500" : ""
          }`}
          value={isServiceCategory ? "Consultar con empresa" : productPrice}
          onChange={(e) =>
            !isServiceCategory && setProductPrice(e.target.value)
          }
          disabled={isServiceCategory}
          placeholder="Ej: 2.00"
          required={!isServiceCategory}
        />
        {errors.productPrice && (
          <p className="text-red-500">{errors.productPrice}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Stock</label>
        {isServiceCategory ? (
          <select
            className="w-full p-2 border rounded"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="Abierto">Abierto</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        ) : (
          <input
            type="number"
            className={`w-full p-2 border rounded ${
              errors.productStock ? "border-red-500" : ""
            }`}
            value={productStock}
            onChange={(e) => setProductStock(Math.max(0, e.target.value))}
            placeholder="Stock del producto"
            min="0"
            required
          />
        )}
        {errors.productStock && (
          <p className="text-red-500">{errors.productStock}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
          Imagen del producto
        </label>
        <input
          type="file"
          className={`w-full p-2 border rounded ${
            errors.productImage ? "border-red-500" : ""
          }`}
          onChange={handleImageChange}
          required
        />
        {errors.productImage && (
          <p className="text-red-500">{errors.productImage}</p>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
