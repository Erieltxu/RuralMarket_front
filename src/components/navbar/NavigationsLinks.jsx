import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NavigationLinks = () => {
  const [userType, setUserType] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("user_type");

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
      <Link to="/" className="text-white hover:text-customHoverColorLila">
        Inicio
      </Link>
      <Link to="/Store" className="text-white hover:text-customHoverColorLila">
        Tienda
      </Link>

      {!loggedIn || userType === "buyer" ? (
        <Link
          to="/altaemprendedora"
          className="text-white hover:text-customHoverColorLila"
        >
          Darse de alta como emprendedora
        </Link>
      ) : null}

      <Link
        to="/nuestrasemprendedoras"
        className="text-white hover:text-customHoverColorLila"
      >
        Nuestras emprendedoras
      </Link>
      {loggedIn && userType === "seller" && (
        <Link
          to="/product"
          className="text-white hover:text-customHoverColorLila"
        >
          Dar de alta un producto o servicio
        </Link>
      )}

      <Link
        to="/quienessomos"
        className="text-white hover:text-customHoverColorLila"
      >
        Quiénes somos
      </Link>
      <Link
        to="/contacto"
        className="text-white hover:text-customHoverColorLila"
      >
        Contacto
      </Link>
    </nav>
  );
};

export default NavigationLinks;
