import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseApi from '../../services/useApi';
import { PRODUCT, CATEGORIES, USERS } from '../../config/urls';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [suggestions, setSuggestions] = useState([]); 
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Obtener productos, categorías y provincias desde la API
    const { data: products } = UseApi({ apiEndpoint: PRODUCT });
    const { data: categories } = UseApi({ apiEndpoint: CATEGORIES });
    const { data: users } = UseApi({ apiEndpoint: USERS });

    // Función de búsqueda y sugerencias
    const handleInputChange = (term) => {
        setSearchTerm(term);

        if (term.length > 1 && (products || categories || users)) {
            const filteredSuggestions = [
                ...products?.map(product => ({ keyword: product.name, path: `/product/${product.id}` })),
                ...categories?.map(category => ({ keyword: category.name, path: `/categories/${category.id}` })),
                ...users?.map(user => ({ keyword: user.province, path: `/users/province/${user.id}` })),
            ].filter(item => item.keyword.toLowerCase().includes(term.toLowerCase()));

            setSuggestions(filteredSuggestions);
            setErrorMessage(filteredSuggestions.length ? '' : 'No se encontraron resultados');
        } else {
            setSuggestions([]);
            setErrorMessage('');
        }
    };

    // Al hacer clic en sugerencia o realizar búsqueda
    const handleSearchClick = (suggestion) => {
        navigate(suggestion.path); // Redirigir a la ruta correspondiente
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            if (suggestions.length > 0) {
                handleSearchClick(suggestions[0]); // Redirigir al primer resultado
            } else {
                setErrorMessage('No se encontraron resultados');
            }
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center border border-gray-200 rounded-[5px] mt-2 w-full md:w-auto">
                <img src="../../../public/img/Search.svg" alt="Search" className="h-5 w-5 ml-2" />
                <input
                    type="text"
                    placeholder={errorMessage || "Búsqueda"}
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-2 py-1 focus:outline-none w-full"
                />
                <button
                    className="bg-customGreen text-white px-4 py-1 rounded-r-[5px] hover:bg-customGreenL"
                    onClick={() => handleSearchClick(suggestions[0])}
                >
                    Búsqueda
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-200 rounded mt-1 w-full z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSearchClick(suggestion)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {suggestion.keyword}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;