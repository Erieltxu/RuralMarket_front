

const ProductDisplay = ({ product, removeProduct }) => {
    // Verificar si la categoría tiene el ID 4 (Servicios)
    const isService = product.category === 4;

    // Lógica para mostrar "Consultar con la empresa" si es un servicio
    const displayPrice = product.price_display;  // Cambiamos a usar price_display

    // Lógica para mostrar "Disponible" o "No disponible" para el stock de los servicios
    const displayStock = isService
        ? (product.stock === 1 ? 'Disponible' : 'No disponible')
        : `${product.stock}`;  // Mostrar stock numérico para productos que no son servicios

    return (
        <div className="border rounded-lg p-4 shadow">
            <img
                src={product.photo}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <h2 className="text-xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-500">Categoría: {product.category_name}</p> {/* Mostrar el nombre de la categoría */}
            <p className="text-gray-500">Vendedor: {product.seller_first_name}</p> {/* Mostrar el nombre del vendedor */}
            <p className="text-gray-600">Stock: {displayStock}</p> {/* Mostrar stock */}
            <p className="text-green-600 font-semibold">{displayPrice}</p> {/* Mostrar el campo price_display */}

            {/* Botón para eliminar el producto */}
            <button 
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => removeProduct(product)}
            >
                Eliminar
            </button>
        </div>
    );
};


export default ProductDisplay;
