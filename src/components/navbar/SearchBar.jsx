import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState(''); // Almacena el valor de la búsqueda

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el estado del término de búsqueda
    };

    const handleSearch = () => {
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm); // Ejecuta la función de búsqueda pasada como prop
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Ejecuta la búsqueda si se presiona "Enter"
        }
    };

    return (
        <div className="flex items-center border border-gray-200 rounded-[5px] mt-2 w-full md:w-auto rounded-r-[5px] overflow-hidden">
            <img src="../../../public/img/Search.svg" alt="Search" className="h-5 w-5 ml-2" />
            <input
                type="text"
                placeholder="Búsqueda"
                value={searchTerm}
                onChange={handleInputChange} // Maneja el cambio en el campo de entrada
                onKeyPress={handleKeyPress} // Busca al presionar "Enter"
                className="pl-2 py-1 focus:outline-none w-full "
            />
            <button
                className="bg-customGreen text-white px-4 py-1 rounded-r-[5px]"
                onClick={handleSearch} // Ejecuta la búsqueda al hacer clic en el botón
            >
                Búsqueda
            </button>
        </div>
    );
};

export default SearchBar;
