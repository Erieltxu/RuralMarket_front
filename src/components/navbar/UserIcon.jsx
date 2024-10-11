import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserIcon = ({ closeMenu }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("user_type");
    setIsAuthenticated(!!token);
    setUserType(type);
  };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_type');
        setIsAuthenticated(false);
        setShowDropdown(false);
        closeMenu(); // Cerrar el menú hamburguesa
        navigate('/'); // Redirigir a la página de inicio
        window.location.reload();
    };

    const handleSales = () => {
        navigate('/ventas');
        setShowDropdown(false);
        closeMenu(); // Cerrar el menú hamburguesa
    };

    const handleSettings = () => {
        navigate('/perfil');
        setShowDropdown(false);
        closeMenu(); // Cerrar el menú hamburguesa
    };

    const handleOrders = () => {
        navigate('/pedidos');
        setShowDropdown(false);
        closeMenu(); // Cerrar el menú hamburguesa
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mx-4" ref={dropdownRef}>
      <img
        src="../../../public/img/user-icon.svg"
        alt="User Icon"
        className="h-6 w-6 cursor-pointer text-black"
        onClick={toggleDropdown}
      />

            {showDropdown && (
                <div className="absolute left mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                    <ul className="py-1 text-gray-700">
                        {isAuthenticated ? (
                            <>
                                <li
                                    className="flex items-center px-4 py-2 cursor-pointer hover:text-customHoverColorLila"
                                >
                                    <Link to="/perfil" onClick={closeMenu} className="flex items-center">
                                        <img
                                            src="/icons/settings.svg"
                                            alt="Settings Icon"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Configuración
                                    </Link>
                                </li>
                                <li
                                    className="flex items-center px-4 py-2 cursor-pointer hover:text-customHoverColorLila"
                                >
                                    <Link to="/pedidos" onClick={closeMenu} className="flex items-center">
                                        <img
                                            src="/icons/orders.svg"
                                            alt="Orders Icon"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Mis pedidos
                                    </Link>
                                </li>
                                {userType === 'seller' && (
                                    <li
                                        className="flex items-center px-4 py-2 cursor-pointer hover:text-customHoverColorLila"
                                    >
                                        <Link to="/ventas" onClick={closeMenu} className="flex items-center">
                                            <img
                                                src="/icons/sales.svg"
                                                alt="Sales Icon"
                                                className="h-5 w-5 mr-2"
                                            />
                                            Mis ventas
                                        </Link>
                                    </li>
                                )}
                                <li
                                    className="flex items-center px-4 py-2 cursor-pointer hover:text-customHoverColorLila"
                                >
                                    <Link to="/" onClick={handleLogout} className="flex items-center">
                                        <img
                                            src="/icons/logout.svg"
                                            alt="Logout Icon"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Cerrar sesión
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className="block px-4 py-2 cursor-pointer hover:text-customHoverColorLila"
                                >
                                    <Link to="/iniciosesion" onClick={() => { closeMenu(); setShowDropdown(false); }}>
                                        Inicia sesión
                                    </Link>
                                </li>
                                <li
                                    className="block px-4 py-2 cursor-pointer hover:text-customHoverColorLila"
                                >
                                    <Link to="/registro" onClick={() => { closeMenu(); setShowDropdown(false); }}>
                                        Regístrate
                                    </Link>
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
