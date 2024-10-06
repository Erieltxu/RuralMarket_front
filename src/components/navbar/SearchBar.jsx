import React from 'react';

const SearchBar = ({ onSearch, suggestions, errorMessage, searchTerm, onInputChange }) => {
    const handleSearch = () => {
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm); 
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center border border-gray-200 rounded-[5px] mt-2 w-full md:w-auto rounded-r-[5px] overflow-hidden">
                <img src="../../../public/img/Search.svg" alt="Search" className="h-5 w-5 ml-2" />
                <input
                    type="text"
                    placeholder={errorMessage || "Búsqueda"} 
                    value={searchTerm}
                    onChange={(e) => onInputChange(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    className={`pl-2 py-1 focus:outline-none w-full ${errorMessage ? 'text-gray-500' : ''}`} 
                    style={{ color: errorMessage ? 'gray' : 'inherit' }} 
                />
                <button
                    className="bg-customGreen text-white px-4 py-1 rounded-r-[5px] hover:bg-customGreenL"
                    onClick={handleSearch}
                >
                    Búsqueda
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-200 rounded mt-1 w-full z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onInputChange(suggestion.keyword); // Establece el término de búsqueda cuando se hace clic en la sugerencia
                                onSearch(suggestion.keyword); // Ejecuta la búsqueda con la sugerencia
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
