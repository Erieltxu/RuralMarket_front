import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SEARCH_PRODUCTS } from '../urls'; // Asegúrate de tener el endpoint de búsqueda correcto

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();

    // Obtiene el parámetro de búsqueda desde el query string
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`${SEARCH_PRODUCTS}?q=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error al buscar:', error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div>
            <h1>Resultados de búsqueda para: {query}</h1>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
