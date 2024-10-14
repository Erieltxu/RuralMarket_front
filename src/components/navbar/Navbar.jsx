import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import UserIcon from "./UserIcon";
import ShoppingCart from "./ShoppingCart";
import HamburgerMenu from "./HamburguerMenu";
import NavigationLinks from "./NavigationsLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const menuRef = useRef(null);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 bg-white z-50 shadow-md py-2">
      <div className="flex justify-between items-center mx-20">
        <Link to="/" onClick={closeMenu} className="mr-5">
          <Logo />
        </Link>
        <HamburgerMenu toggleMenu={toggleMenu} />
        <div className="hidden md:flex flex-grow justify-center rounded-md">
          <SearchBar />
        </div>
        <div className="hidden md:flex items-center space-x-4 ml-5">
          <UserIcon className="h-6 w-6" />
          <Link to="/carrito" onClick={closeMenu}>
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="md:hidden mx-7 mt-1">
        <SearchBar />
      </div>

      <div className="bg-customPurple p-3 mt-5 rounded-md shadow-lg">
        <NavigationLinks />
      </div>

      {isMenuOpen && (
        <div
          className="absolute top-16 left-0 w-full bg-white/90 p-4 z-50 transition-all duration-300 ease-in-out rounded-lg shadow-lg"
          ref={menuRef}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Menú</h3>
            <button
              onClick={closeMenu}
              className="text-3xl text-black hover:text-gray-800 transition-all duration-200"
            >
              &times;
            </button>
          </div>
          <nav className="font-bold flex flex-col space-y-2 mt-2">
            <Link
              to="/"
              className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              to="/nuestrasemprendedoras"
              className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
              onClick={closeMenu}
            >
              Nuestras emprendedoras
            </Link>
            <Link
              to="/store"
              className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
              onClick={closeMenu}
            >
              Tienda
            </Link>

            {!loggedIn || userType === "buyer" ? (
              <Link
                to="/altaemprendedora"
                className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
                onClick={closeMenu}
              >
                Darse de alta como emprendedora
              </Link>
            ) : null}

            {loggedIn && userType === "seller" && (
              <Link
                to="/product"
                className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
                onClick={closeMenu}
              >
                Dar de alta un producto
              </Link>
            )}

            <Link
              to="/quienessomos"
              className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
              onClick={closeMenu}
            >
              Quiénes somos
            </Link>
            <Link
              to="/contacto"
              className="text-gray-800 hover:text-customHoverColorLila transition duration-200 px-2 py-1"
              onClick={closeMenu}
            >
              Contacto
            </Link>
            <div className="flex items-center mt-2">
              <UserIcon className="h-6 w-6" />
              <Link to="/carrito" onClick={closeMenu}>
                <ShoppingCart className="h-6 w-6 ml-2" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
