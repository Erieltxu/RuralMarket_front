

const Receipt = ({ cart, total }) => {
    return (
        <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recibo de compra</h2>

            <ul className="divide-y divide-gray-200">
                {cart.map((product) => (
                    <li key={product.id} className="py-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-800 font-semibold">{product.name}</h3>
                            <p className="text-gray-500">Cantidad: {product.quantity}</p>
                            <p className="text-gray-500">Precio unitario: €{product.price.toFixed(2)}</p>
                        </div>
                        <p className="text-gray-800 font-semibold">
                            Subtotal: €{(product.price * product.quantity).toFixed(2)}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 border-t pt-4">
                <h3 className="text-xl font-bold text-gray-800">Total: €{total.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Receipt;