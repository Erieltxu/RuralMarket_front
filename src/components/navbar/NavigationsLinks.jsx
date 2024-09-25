import { Link } from 'react-router-dom';

const NavigationLinks = () => {
  return (
    <nav className="hidden md:flex space-x-9 bg-customPurple justify-center ">
      <Link to="/" className="text-white">Inicio</Link> 
      <Link to="/uploadProduct" className="text-white">Tienda</Link> 
      <Link to="/altaemprendedora" className="text-white">Darse de alta como emprendedora</Link>
      <Link to="/quienessomos" className="text-white">Quiénes somos</Link>
      <Link to="/contacto" className="text-white">Contacto</Link> 
    </nav>
  );
};

export default NavigationLinks;

