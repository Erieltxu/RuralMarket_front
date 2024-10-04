import Cart from '../components/cart/Cart'; // Ajusta la ruta según la estructura de tu proyecto

const CartPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrito de Compras</h1>
                {/* Aquí se renderiza el componente Cart, que incluye todo el carrito */}
                <Cart />
            </div>
        </div>
    );
};

export default CartPage;