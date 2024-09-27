import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavigationLinks = () => {
  const [userType, setUserType] = useState(null);  // Estado para almacenar el tipo de usuario
  const [loggedIn, setLoggedIn] = useState(false);  // Estado para verificar si el usuario está logueado

  // Obtener el token y el user_type desde el localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('user_type');

    if (token && storedUserType) {
      setLoggedIn(true);
      setUserType(storedUserType);
    } else {
      setLoggedIn(false);
      setUserType(null);
    }
  }, []);  // Se ejecuta solo una vez al cargar el componente

  return (
    <nav className="hidden md:flex space-x-9 bg-customPurple justify-center">
      <Link to="/" className="text-white">Inicio</Link>
      <Link to="/productStore" className="text-white">Tienda</Link>
      
      {/* Si no está logueado o si el tipo de usuario es "buyer", mostrar "Darse de alta como emprendedora" */}
      {!loggedIn || userType === 'buyer' ? (
        <Link to="/altaemprendedora" className="text-white">Darse de alta como emprendedora</Link>
      ) : null}

      {/* Si el tipo de usuario es "seller", mostrar "Dar de alta un producto" */}
      {loggedIn && userType === 'seller' && (
        <Link to="/altaProducto" className="text-white">Dar de alta un producto</Link>
      )}

      <Link to="/quienessomos" className="text-white">Quiénes somos</Link>
      <Link to="/contacto" className="text-white">Contacto</Link>
    </nav>
  );
};

export default NavigationLinks;
