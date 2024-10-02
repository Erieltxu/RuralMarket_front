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

    // Usar el hook personalizado UseApi para obtener los productos, categorías y vendedoras
    const { data: products, loading: loadingProducts, error: errorProducts } = UseApi({ apiEndpoint: PRODUCT });
    const { data: categories, loading: loadingCategories, error: errorCategories } = UseApi({ apiEndpoint: CATEGORIES });
    const { data: sellers, loading: loadingSellers, error: errorSellers } = UseApi({ apiEndpoint: USERS });

    useEffect(() => {
        if (sellerIdFromUrl) {
            setSelectedSeller(sellerIdFromUrl); // Si hay un sellerId en la URL, úsalo
        }
    }, [sellerIdFromUrl]);

    // Filtrar productos por nombre, categoría y vendedor (si hay un ID de vendedor en la URL o en el dropdown)
    const filteredProducts = products?.filter((product) => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || product.category_name === selectedCategory;
        const matchesSeller = selectedSeller === '' || product.seller === parseInt(selectedSeller); // Filtrar por vendedora seleccionada o por sellerId de la URL
        return matchesSearchTerm && matchesCategory && matchesSeller;
    }) || [];

    // Función para manejar agregar el producto al carrito
    const handleAddToCart = (product, quantity) => {
        console.log(`Añadido al carrito: ${product.name} - Cantidad: ${quantity}`);
        // Aquí puedes agregar la lógica para añadir el producto al carrito en el backend o localStorage
    };

    // Manejo de carga y errores
    if (loadingProducts || loadingCategories || loadingSellers) return <p>Cargando productos, categorías y vendedoras...</p>;
    if (errorProducts || errorCategories || errorSellers) return <p>Error al cargar datos: {errorProducts || errorCategories || errorSellers}</p>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Título centrado */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Catálogo de Productos</h1>
            </div>

            {/* Contenedor para los filtros y las tarjetas */}
            <div className="flex">
                {/* Filtros de categorías y vendedoras */}
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
                        className="w-full p-1 border rounded-md"
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
