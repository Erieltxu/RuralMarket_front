import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../config/routesMap';
import SearchBar from './SearchBar';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]); 
    const navigate = useNavigate(); 

    // Función que maneja la búsqueda
    const handleSearch = (term) => {
        const lowerCaseTerm = term.toLowerCase(); 
        const filteredResults = routesMap.filter(route =>
            route.keyword.includes(lowerCaseTerm)
        );

        if (filteredResults.length > 0) {
            navigate(filteredResults[0].path); 
            setErrorMessage(''); 
        } else {
            setErrorMessage('No se encontró la búsqueda'); 
            setSearchTerm(''); 
        }
    };

    // Función que maneja los cambios en el input de búsqueda
    const handleInputChange = (term) => {
        setSearchTerm(term); 
        setErrorMessage(''); 

        // Muestra las sugerencias si el término tiene más de 1 letra
        if (term.length > 1) {
            const filteredSuggestions = routesMap.filter(route =>
                route.keyword.includes(term.toLowerCase())
            );
            setSuggestions(filteredSuggestions); 
        } else {
            setSuggestions([]); 
        }
    };

    return (
        <div>
            <SearchBar 
                onSearch={handleSearch} 
                errorMessage={errorMessage} 
                suggestions={suggestions} 
                searchTerm={searchTerm} 
                onInputChange={handleInputChange} 
            />
        </div>
    );
};

export default SearchComponent;
