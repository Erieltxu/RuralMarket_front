import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserIcon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className="mx-4">
            <img
                src="../../../public/img/user-icon.svg"
                alt="User Icon"
                className="h-6 w-6 cursor-pointer"
                onClick={handleClick} 
            />
        </div>
    );
};

export default UserIcon;
