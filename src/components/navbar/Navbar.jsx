import { useState } from 'react';
import Logo from "./logo";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import ShoppingCart from "./ShoppingCart";
import HamburgerMenu from "./HamburguerMenu";
import NavigationLinks from "./NavigationsLinks";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="p-4 shadow-md">
            {/* Flex container para el layout responsivo */}
            <div className="flex justify-between items-center">
                {/* Logo a la izquierda */}
                <Logo />

                {/* Menú hamburguesa solo visible en móvil */}
                <HamburgerMenu toggleMenu={toggleMenu} />

                {/* Barra de búsqueda visible en desktop, oculta en móvil */}
                <div className="hidden md:flex flex-grow justify-center">
                    <SearchBar />
                </div>

                {/* Iconos de usuario y carrito visibles en desktop */}
                <div className="hidden md:flex items-center">
                    <UserIcon />
                    <ShoppingCart />
                </div>
            </div>

            {/* Barra de búsqueda visible en móvil, oculta en desktop */}
            <div className="md:hidden">
                <SearchBar />
            </div>

            {/* Enlaces de navegación visibles en desktop */}
            <div className="bg-purple-700 p-2 mt-2">
                <NavigationLinks />
            </div>

            {/* Menú desplegable en móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-purple-700 p-2 mt-2">
                    <nav className="space-y-2">
                        <a href="#" className="block text-white">Inicio</a>
                        <a href="#" className="block text-white">Tienda</a>
                        <a href="#" className="block text-white">Darse de alta como emprendedora</a>
                        <a href="#" className="block text-white">Quiénes somos</a>
                        <a href="#" className="block text-white">Contacto</a>
                        <UserIcon />
                        <ShoppingCart />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;