const HamburgerMenu = ({ toggleMenu }) => {
    return (
        <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
                &#9776; {/* Símbolo del menú hamburguesa */}
            </button>
        </div>
    );
};

export default HamburgerMenu;