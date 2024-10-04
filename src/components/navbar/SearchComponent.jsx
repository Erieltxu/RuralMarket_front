import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const SearchComponent = () => {
    const [results, setResults] = useState([]);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`http://tu-api.com/search?q=${searchTerm}`);
            setResults(response.data); // Asume que la API devuelve una lista de resultados
        } catch (error) {
            console.error("Error al buscar:", error);
        }
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.name}</li> // Muestra los resultados de la API
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
