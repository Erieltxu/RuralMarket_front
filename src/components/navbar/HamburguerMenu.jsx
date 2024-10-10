const HamburgerMenu = ({ toggleMenu }) => {
  return (
    <div className="md:hidden mr-3">
      <button onClick={toggleMenu} className="text-3xl">
        &#9776;
      </button>
    </div>
  );
};

export default HamburgerMenu;
