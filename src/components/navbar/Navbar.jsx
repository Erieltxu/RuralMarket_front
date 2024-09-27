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
        <header className="py-3 ">
            <div className="flex justify-between items-center mx-5">
                <Logo />
                <HamburgerMenu toggleMenu={toggleMenu} />
                <div className="hidden md:flex flex-grow justify-center">
                    <SearchBar />
                </div>
                <div className="hidden md:flex items-center">
                    <UserIcon />
                    <ShoppingCart />
                </div>
            </div>
            <div className="md:hidden m-5">
                <SearchBar />
            </div>

            {/* Enlaces de navegación visibles en desktop */}
            <div className="bg-customPurple p-2 mt-2">
                <NavigationLinks />
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white p-2 mt-2">
                    <nav className="space-y-2">
                        <a href="#" className="block text-#1a1a1a">Inicio</a>
                        <a href="#" className="block text-#1a1a1a">Tienda</a>
                        <a href="#" className="block text-#1a1a1a">Darse de alta como emprendedora</a>
                        <a href="#" className="block text-#1a1a1a">Quiénes somos</a>
                        <a href="#" className="block text-#1a1a1a">Contacto</a>
                        <UserIcon />
                        <ShoppingCart />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;