

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
    productCategory, // Se agrega el campo de categoría para manejar la lógica condicional
}) {
    const isServiceCategory = productCategory === '4'; // Comprobar si la categoría es "Servicios" (ID = 4)

    return (
        <>
            {/* Campo para el nombre del producto */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nombre del Producto</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.productName ? 'border-red-500' : ''}`}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                />
                {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>

            {/* Campo para el precio del producto */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Precio</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.productPrice ? 'border-red-500' : ''}`}
                    value={isServiceCategory ? 'Consultar con empresa' : productPrice} // Mostrar "Consultar con empresa" si es Servicios
                    onChange={(e) => !isServiceCategory && setProductPrice(e.target.value)} // Solo permitir cambios si no es Servicios
                    disabled={isServiceCategory} // Desactivar el campo si es Servicios
                    placeholder="Ej: 2.00"
                    required={!isServiceCategory} // No es obligatorio si es Servicios
                />
                {errors.productPrice && <p className="text-red-500">{errors.productPrice}</p>}
            </div>

            {/* Campo para el stock o dropdown si es Servicios */}
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
                        className={`w-full p-2 border rounded ${errors.productStock ? 'border-red-500' : ''}`}
                        value={productStock}
                        onChange={(e) => setProductStock(Math.max(0, e.target.value))} // No permitir números negativos
                        placeholder="Stock del producto"
                        min="0" // Establecer el valor mínimo en 0
                        required
                    />
                )}
                {errors.productStock && <p className="text-red-500">{errors.productStock}</p>}
            </div>

            {/* Campo para la imagen del producto */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagen del producto</label>
                <input
                    type="file"
                    className={`w-full p-2 border rounded ${errors.productImage ? 'border-red-500' : ''}`}
                    onChange={handleImageChange}
                    required
                />
                {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
            </div>
        </>
    );
}

export default ProductDetails;
