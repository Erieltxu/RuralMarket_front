

const ProductDisplay = ({ product, removeProduct }) => {
    const isService = product.category === 4;

    const displayPrice = isService ? 'Consultar con la empresa' : `${parseFloat(product.price).toFixed(2)} €`;

    const displayStock = isService
        ? (product.stock === 1 ? 'Disponible' : 'No disponible')
        : `${product.stock}`; 

    return (
        <div className="border rounded-lg p-4 shadow">
            <img
                src={product.photo}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <h2 className="text-xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-500">Categoría: {product.category_name}</p> 
            <p className="text-gray-500">Vendedor: {product.seller_first_name}</p> 
            <p className="text-gray-600">Stock: {displayStock}</p> 
            <p className="text-green-600 font-semibold">{displayPrice}</p> 

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
