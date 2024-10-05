import React, { useState } from 'react';
import Modal from 'react-modal';
import ButtonGreen from '../ButtonGreen';

Modal.setAppElement('#root');

function ProductCard({ product, handleAddToCart }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(Math.max(quantity - 1, 1)); // No permitir cantidad menor a 1
    };

    if (!product || !product.id) {
        return null; // Evitar renderizado si no hay producto o no tiene id
    }

    return (
        <div className="border rounded-lg p-4 shadow bg-gray-50 flex flex-col justify-between">
            {product.photo ? (
                <img
                    src={product.photo}
                    alt={product.name || 'Imagen del producto'}
                    className="w-full h-40 object-cover mb-2 rounded-md cursor-pointer"
                    onClick={openModal} // Abre el modal al hacer clic en la imagen
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-2">
                    <p className="text-gray-500">Sin imagen disponible</p>
                </div>
            )}
            <h2 className="text-xl font-bold mb-1">{product.name}</h2>

            {/* Mostrar categoría y nombre del vendedor */}
            <p className="text-gray-600">Categoría: {product.category_name || 'No disponible'}</p>
            <p className="text-gray-600">Vendedor: {product.seller_first_name || 'No disponible'}</p>

            {/* Stock y precio debajo de la imagen */}
            <div className="mt-auto">
                <p className="text-gray-600">Stock: {product.stock || 'No disponible'}</p>
                <p className="text-green-600 font-semibold">
                    {typeof product.price === 'string' ? (
                        `${parseFloat(product.price).toFixed(2).replace('.', ',')} €`
                    ) : (
                        'Precio no disponible'
                    )}
                </p>

                <div className="flex items-center mt-2 mb-4">
                    <button className="bg-red-200 p-1 rounded" onClick={decrementQuantity}>
                        -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button className="bg-green-200 p-1 rounded" onClick={incrementQuantity}>
                        +
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <ButtonGreen
                    backgroundColor="bg-customGreen"
                    textColor="text-white px-6 py-3"
                    style={{ width: '100%', padding: '12px 24px', fontSize: '1.25rem' }}
                    onClick={() => {
                        console.log('Agregando producto al carrito:', product.id, 'Cantidad:', quantity);
                        handleAddToCart(product, quantity);
                    }}
                >
                    Agregar al carrito
                </ButtonGreen>
            </div>

            {/* Modal con la imagen más grande y la descripción del producto */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Detalle del Producto"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div className="p-4 flex items-start">
                    {product.photo && (
                        <img
                            src={product.photo}
                            alt={product.name}
                            className="w-[400px] h-[300px] object-cover rounded-md mb-4 mr-4"
                        />
                    )}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                        <p className="text-gray-700">Categoría: {product.category_name || 'No disponible'}</p>
                        <p className="text-gray-700">Vendedor: {product.seller_first_name || 'No disponible'}</p>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default ProductCard;
