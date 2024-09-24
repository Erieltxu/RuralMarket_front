import { Link } from 'react-router-dom';


const NavigationLinks = () => {
  return (
    <nav className="hidden md:flex space-x-9 bg-customPurple justify-center ">
      <Link to="/" className="text-white">Inicio</Link>
      <Link to="/uploadProduct" className="text-white">Tienda</Link>
      <a href="#" className="text-white">Darse de alta como emprendedora</a>
      <a href="#" className="text-white">Quiénes somos</a>
      <a href="#" className="text-white">Contacto</a>
    </nav>
  );
};

export default NavigationLinks;
