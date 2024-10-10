/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UseApi from '../../services/useApi';
import { PRODUCT, CATEGORIES, USERS } from '../../config/urls';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); 

    const { data: products } = UseApi({ apiEndpoint: PRODUCT });
    const { data: categories } = UseApi({ apiEndpoint: CATEGORIES });
    const { data: users } = UseApi({ apiEndpoint: USERS });

    const handleInputChange = (term) => {
        setSearchTerm(term);

        if (term.length > 1 && (products || categories || users)) {
            const hasResults = [
                ...products?.map(product => product.name),
                ...categories?.map(category => category.name),
                ...users?.map(user => user.province),
            ].some(keyword => keyword.toLowerCase().includes(term.toLowerCase()));

            setErrorMessage(hasResults ? '' : 'No se encontraron resultados');
        } else {
            setErrorMessage('');
        }
    };

    const handleSearchClick = () => {
        if (searchTerm.trim()) {
            const searchUrl = `/Store?search=${encodeURIComponent(searchTerm)}`;

            if (location.pathname === '/Store') {
                navigate(searchUrl, { replace: true });
                window.location.reload(); 
            } else {
                navigate(searchUrl); 
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            handleSearchClick();  
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
                    onClick={handleSearchClick}
                >
                    Búsqueda
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
