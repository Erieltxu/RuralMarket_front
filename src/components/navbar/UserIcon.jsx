import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserIcon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login'); // Cambia "/login" a la ruta correspondiente a tu página de login
    };

    return (
        <div className="ml-4">
            <img
                src="/user-icon.png"
                alt="User Icon"
                className="h-8 w-8 cursor-pointer"
                onClick={handleClick} // Ejecuta la función para redirigir al hacer clic
            />
        </div>
    );
};

export default UserIcon;
