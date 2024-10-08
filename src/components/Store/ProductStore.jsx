import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCT, CATEGORIES, USERS, CART, CARTITEM } from '../../config/urls';
import UseApi from '../../services/useApi';
import ProductCard from './ProductCard';
import axios from 'axios';
import PopUp from '../PopUp';

function ProductStore() {
    const [searchParams] = useSearchParams();
    const sellerIdFromUrl = searchParams.get('seller');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSeller, setSelectedSeller] = useState(sellerIdFromUrl || '');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [showPopup, setShowPopup] = useState(false);  // Estado para controlar la visibilidad del PopUp
    const [popupMessage, setPopupMessage] = useState('');  // Mensaje del PopUp

    const { data: products, loading: loadingProducts, error: errorProducts } = UseApi({ apiEndpoint: PRODUCT });
    const { data: categories, loading: loadingCategories, error: errorCategories } = UseApi({ apiEndpoint: CATEGORIES });
    const { data: sellers, loading: loadingSellers, error: errorSellers } = UseApi({ apiEndpoint: USERS });

    const authenticated = !!localStorage.getItem('token');  // Verificar autenticación

    useEffect(() => {
        if (sellerIdFromUrl) {
            setSelectedSeller(sellerIdFromUrl);
        }
    }, [sellerIdFromUrl]);

    // Función para cerrar el PopUp
    const handlePopupClose = () => {
        setShowPopup(false);
    };

    // Lógica para manejar agregar productos al carrito
    const handleAddToCart = async (product, quantity) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setPopupMessage('Debes estar registrado para usar el carrito de compras');
                setShowPopup(true);  // Mostrar el PopUp si no está autenticado
                return;
            }

            // Obtener o crear carrito
            let cartId = localStorage.getItem('cartId');
            if (!cartId) {
                try {
                    const cartResponse = await axios.get(CART, {
                        headers: {
                            Authorization: `Token ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (cartResponse.data && cartResponse.data.length > 0) {
                        cartId = cartResponse.data[0].id;
                        localStorage.setItem('cartId', cartId);
                    } else {
                        console.error('No se encontró un carrito existente.');
                        return;
                    }
                } catch (error) {
                    console.error('Error al obtener el carrito existente:', error.response?.data || error);
                    return;
                }
            }

            // Agregar producto al carrito
            const cartItem = {
                product_id: product.id,
                quantity,
                cart_id: cartId,
            };

            await axios.post(CARTITEM, cartItem, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Producto añadido al carrito');
        } catch (error) {
            console.error('Error al añadir producto al carrito:', error.response?.data || error);
        }
    };

    if (loadingProducts || loadingCategories || loadingSellers) return <p>Cargando productos, categorías y vendedoras...</p>;
    if (errorProducts || errorCategories || errorSellers) return <p>Error al cargar datos: {errorProducts || errorCategories || errorSellers}</p>;

    const filteredProducts = products?.filter((product) => {
        const matchesSearchTerm = product.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim());
        const matchesCategory = selectedCategory === '' || product.category_name === selectedCategory;
        const matchesSeller = selectedSeller === '' || product.seller === parseInt(selectedSeller);
        const matchesProvince = selectedProvince === '' || sellers.find(seller => seller.id === product.seller)?.province === selectedProvince;

        return matchesSearchTerm && matchesCategory && matchesSeller && matchesProvince;
    }) || [];

    const provinces = Array.from(new Set(sellers?.map(seller => seller.province)));

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Catálogo de Productos y Servicios</h1>
            </div>

            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre..."
                    className="w-1/4 p-2 border rounded-md mx-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex">
                <div className="w-1/6 pr-4 ml-4">
                    <label htmlFor="category" className="block font-bold mb-2">Filtrar por categoría</label>
                    <select
                        id="category"
                        className="w-full p-1 border rounded-md mb-4"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="seller" className="block font-bold mb-2">Filtrar por vendedora</label>
                    <select
                        id="seller"
                        className="w-full p-1 border rounded-md mb-4"
                        value={selectedSeller}
                        onChange={(e) => setSelectedSeller(e.target.value)}
                    >
                        <option value="">Todas las vendedoras</option>
                        {sellers && sellers
                            .filter(seller => seller.user_type === 'seller')
                            .map((seller) => (
                                <option key={seller.id} value={seller.id}>
                                    {seller.first_name}
                                </option>
                            ))}
                    </select>

                    <label htmlFor="province" className="block font-bold mb-2">Filtrar por provincia</label>
                    <select
                        id="province"
                        className="w-full p-1 border rounded-md"
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                        <option value="">Todas las provincias</option>
                        {provinces && provinces.map((province, index) => (
                            <option key={index} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-5/6 pl-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                />
                            ))
                        ) : (
                            <p>No hay productos disponibles.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mostrar el PopUp si es necesario */}
            {showPopup && (
                <PopUp
                    message={popupMessage}
                    type="error"
                    onClose={handlePopupClose}
                />
            )}
        </div>
    );
}

export default ProductStore;
