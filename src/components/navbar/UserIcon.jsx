import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UserIcon = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

 
    useEffect(() => {
        checkAuthentication(); 
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            checkAuthentication(); 
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogin = () => {
        navigate('/iniciosesion');
        setShowDropdown(false);
    };

    const handleRegister = () => {
        navigate('/registro');
        setShowDropdown(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        window.dispatchEvent(new Event('storage')); 
        setShowDropdown(false);
        navigate('/');
    };

    const handleSettings = () => {
        navigate('/perfil');
        setShowDropdown(false);
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative mx-4" ref={dropdownRef}>
            <img
                src="../../../public/img/user-icon.svg"
                alt="User Icon"
                className="h-6 w-6 cursor-pointer"
                onClick={toggleDropdown}
            />

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1 text-gray-700">
                        {isAuthenticated ? (
                            <>
                                <li
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={handleSettings}
                                >
                               
                                    <img
                                        src="/icons/settings.svg"
                                        alt="Settings Icon"
                                        className="h-5 w-5 mr-2"
                                    />
                                    Configuración
                                </li>
                                <li
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                               
                                    <img
                                        src="/icons/logout.svg"
                                        alt="Logout Icon"
                                        className="h-5 w-5 mr-2"
                                    />
                                    Cerrar sesión
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={handleLogin}
                                >
                                    Inicia sesión
                                </li>
                                <li
                                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={handleRegister}
                                >
                                    Regístrate
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserIcon;
