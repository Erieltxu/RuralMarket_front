import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Para obtener los parámetros de búsqueda de la URL
import { PRODUCT, CATEGORIES, USERS } from '../../config/urls'; // Asegúrate de tener el endpoint de productos, categorías y usuarios
import UseApi from '../../services/useApi'; // Importa el hook personalizado
import ProductCard from './ProductCard'; // Importa el componente de la tarjeta de producto

function ProductStore() {
    const [searchParams] = useSearchParams(); // Obtener los parámetros de la URL
    const sellerIdFromUrl = searchParams.get('seller'); // Obtener el parámetro 'seller' de la URL
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
    const [selectedSeller, setSelectedSeller] = useState(sellerIdFromUrl || ''); // Estado para la vendedora seleccionada, inicializado con sellerId de la URL
    const [selectedProvince, setSelectedProvince] = useState(''); // Estado para la provincia seleccionada

    // Usar el hook personalizado UseApi para obtener los productos, categorías y vendedoras
    const { data: products, loading: loadingProducts, error: errorProducts } = UseApi({ apiEndpoint: PRODUCT });
    const { data: categories, loading: loadingCategories, error: errorCategories } = UseApi({ apiEndpoint: CATEGORIES });
    const { data: sellers, loading: loadingSellers, error: errorSellers } = UseApi({ apiEndpoint: USERS });

    useEffect(() => {
        if (sellerIdFromUrl) {
            setSelectedSeller(sellerIdFromUrl); // Si hay un sellerId en la URL, úsalo
        }
    }, [sellerIdFromUrl]);

    // Filtrar productos por nombre, categoría, vendedora y provincia
    const filteredProducts = products?.filter((product) => {
        const matchesSearchTerm = product.name
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim());
        const matchesCategory = selectedCategory === '' || product.category_name === selectedCategory;
        const matchesSeller = selectedSeller === '' || product.seller === parseInt(selectedSeller); // Filtrar por vendedora seleccionada o por sellerId de la URL
        const matchesProvince = selectedProvince === '' || sellers.find(seller => seller.id === product.seller)?.province === selectedProvince; // Filtrar por provincia

        return matchesSearchTerm && matchesCategory && matchesSeller && matchesProvince;
    }) || [];

    // Función para manejar agregar el producto al carrito
    const handleAddToCart = (product, quantity) => {
        console.log(`Añadido al carrito: ${product.name} - Cantidad: ${quantity}`);
        // Aquí puedes agregar la lógica para añadir el producto al carrito en el backend o localStorage
    };

    // Manejo de carga y errores
    if (loadingProducts || loadingCategories || loadingSellers) return <p>Cargando productos, categorías y vendedoras...</p>;
    if (errorProducts || errorCategories || errorSellers) return <p>Error al cargar datos: {errorProducts || errorCategories || errorSellers}</p>;

    // Obtener la lista de provincias de las vendedoras
    const provinces = Array.from(new Set(sellers?.map(seller => seller.province))); // Eliminar duplicados

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Título centrado */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Catálogo de Productos y Servicios</h1>
            </div>

            {/* Buscador de productos, centrado y más pequeño */}
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre..."
                    className="w-1/4 p-2 border rounded-md mx-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                />
            </div>

            {/* Contenedor para los filtros y las tarjetas */}
            <div className="flex">
                {/* Filtros de categorías, vendedoras y provincias */}
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

                    {/* Filtro por vendedora */}
                    <label htmlFor="seller" className="block font-bold mb-2">Filtrar por vendedora</label>
                    <select
                        id="seller"
                        className="w-full p-1 border rounded-md mb-4"
                        value={selectedSeller}
                        onChange={(e) => setSelectedSeller(e.target.value)}
                    >
                        <option value="">Todas las vendedoras</option>
                        {sellers && sellers
                            .filter(seller => seller.user_type === 'seller') // Filtrar solo las vendedoras
                            .map((seller) => (
                                <option key={seller.id} value={seller.id}>
                                    {seller.first_name}
                                </option>
                            ))}
                    </select>

                    {/* Filtro por provincia */}
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

                {/* Tarjetas de productos */}
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
        </div>
    );
}

export default ProductStore;
