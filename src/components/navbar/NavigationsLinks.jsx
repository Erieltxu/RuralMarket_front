import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavigationLinks = () => {
  const [userType, setUserType] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


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
  }, []);

  return (
    <nav className="hidden font-bold md:flex space-x-9 bg-customPurple justify-between w-full px-10">
      <Link to="/" className="text-white">Inicio</Link>
<<<<<<< HEAD
      <Link to="/productStore" className="text-white">Tienda</Link>


=======
      <Link to="/productlist" className="text-white">Tienda</Link>
      
   
>>>>>>> 6f55683 (DONE add photos TODO time)
      {!loggedIn || userType === 'buyer' ? (
        <Link to="/altaemprendedora" className="text-white">Darse de alta como emprendedora</Link>
      ) : null}

<<<<<<< HEAD

=======
      <Link to="" className="text-white">Nuestras emprendedoras</Link>
>>>>>>> 6f55683 (DONE add photos TODO time)
      {loggedIn && userType === 'seller' && (
        <Link to="/product" className="text-white">Dar de alta un producto</Link>
      )}

      <Link to="/quienessomos" className="text-white">Quiénes somos</Link>
      <Link to="/contacto" className="text-white">Contacto</Link>
    </nav>
  );
};

export default NavigationLinks;
