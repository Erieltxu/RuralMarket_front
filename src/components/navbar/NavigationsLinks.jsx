import react from "react";


const NavigationLinks = () => {
  return (
    <nav className="hidden md:flex space-x-4 bg-customPurple ">
      <a href="#" className="text-white">Inicio</a>
      <a href="#" className="text-white">Tienda</a>
      <a href="#" className="text-white">Darse de alta como emprendedora</a>
      <a href="#" className="text-white">Quiénes somos</a>
      <a href="#" className="text-white">Contacto</a>
    </nav>
  );
};

export default NavigationLinks;