import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./logo";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import ShoppingCart from "./ShoppingCart";
import HamburgerMenu from "./HamburguerMenu";
import NavigationLinks from "./NavigationsLinks";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 bg-white z-50 shadow-md py-2">
            <div className="flex justify-between items-center mx-5">
                <Link to="/" onClick={closeMenu}>
                    <Logo />
                </Link>
                <HamburgerMenu toggleMenu={toggleMenu} />
                <div className="hidden md:flex flex-grow justify-center rounded-[5px]">
                    <SearchBar />
                </div>
                <div className="hidden md:flex items-center">
                    <UserIcon />
                    <Link to="/carrito" onClick={closeMenu}>
                        <ShoppingCart />
                    </Link>
                </div>
            </div>
            <div className="md:hidden mx-7 mt-1 ">
                <SearchBar />
            </div>

            <div className="bg-customPurple p-3 mt-5">
                <NavigationLinks />
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white/90 p-2 z-50 transition-all duration-300 ease-in-out">
                    <div className="flex justify-end">
                        <button onClick={closeMenu} className="text-3xl">
                            &times;
                        </button>
                    </div>
                    <nav className="font-bold flex flex-col space-y-2 ">
                        <Link to="/" className="text-#1a1a1a" onClick={closeMenu}>Inicio</Link>
                        <Link to="/nuestrasemprendedoras" className="text-white">Nuestras emprendedoras</Link>
                        <Link to="/productStore" className="text-#1a1a1a" onClick={closeMenu}>Tienda</Link>

                        {!loggedIn || userType === 'buyer' ? (
                            <Link to="/altaemprendedora" className="text-#1a1a1a" onClick={closeMenu}>Darse de alta como emprendedora</Link>
                        ) : null}

                        {loggedIn && userType === 'seller' && (
                            <Link to="/altaProducto" className="text-#1a1a1a" onClick={closeMenu}>Dar de alta un producto</Link>
                        )}

                        <Link to="/quienessomos" className="text-#1a1a1a" onClick={closeMenu}>Quiénes somos</Link>
                        <Link to="/contacto" className="text-#1a1a1a" onClick={closeMenu}>Contacto</Link>
                        <UserIcon />
                        <Link to="/carrito" onClick={closeMenu}>
                            <ShoppingCart />
                        </Link>
                    </nav>
                </div>

            )}
        </header>
    );
};

export default Navbar;