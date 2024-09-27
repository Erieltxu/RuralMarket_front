import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../../services/useApi'; // Usando tu hook useApi
import { USER_DETAIL } from '../../config/urls';

const NavigationLinks = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: userData, loading, error } = useApi({
    apiEndpoint: USER_DETAIL,
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    if (userData) {
      setUserType(userData.user_type);
      setIsLoggedIn(true); // Usuario logueado
    } else {
      setIsLoggedIn(false); // Usuario no logueado
    }
  }, [userData]);

  return (
    <nav className="hidden md:flex space-x-9 bg-customPurple justify-center ">
      {/* Mostrar tipo de usuario y estado de login para depuración */}
      <p>{`User Type: ${userType}`}</p>
      <p>{`Logged In: ${isLoggedIn}`}</p>

      <Link to="/" className="text-white">Inicio</Link>
      <Link to="/productStore" className="text-white">Tienda</Link>

      {/* Mostrar "Darse de alta como emprendedora" si el usuario no está logueado o es comprador */}
      {!isLoggedIn || (userType === 'buyer') ? (
        <Link to="/altaemprendedora" className="text-white">Darse de alta como emprendedora</Link>
      ) : null}

      {/* Mostrar "Dar de alta un producto" solo si el usuario es vendedor */}
      {isLoggedIn && userType === 'seller' && (
        <Link to="/alta-producto" className="text-white">Dar de alta un producto</Link>
      )}

      <Link to="/quienessomos" className="text-white">Quiénes somos</Link>
      <Link to="/contacto" className="text-white">Contacto</Link>
    </nav>
  );
};

export default NavigationLinks;
