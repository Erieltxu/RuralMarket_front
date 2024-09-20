import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-green-600">RuralMarket</span>
        </div>
    );
};

export default Logo;