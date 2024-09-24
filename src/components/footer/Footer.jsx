const Footer = () => {
  return (
    <footer className="bg-customPurple text-white py-6">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-2 lg:space-y-2">
        
        {/* Sección izquierda - Logo, descripción y correo */}
        <div className="flex flex-col mb-6 lg:mb-0 lg:max-w-md lg:pr-8 items-center lg:items-start">
          <div className="flex items-center mb-4 justify-center lg:justify-start">
            <img src="/img/rmPlant.png" alt="Rural Market Logo" className="h-8 mr-3" />
            <span className="text-2xl font-bold">Rural Market</span>
          </div>
          {/* Texto y correo - Visible solo en Desktop */}
          <div className="hidden lg:block text-center lg:text-left">
            <p className="mb-4 text-white lg:max-w-md">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
            </p>
            <a href="mailto:proxy@gmail.com" className="bg-customGreen text-white px-4 py-2 font-semibold rounded-md hover:bg-customGreenL w-max">
              Proxy@gmail.com
            </a>
          </div>
        </div>

        {/* Sección derecha - Ayuda, enlaces y copyright */}
        <div className="flex flex-col w-full lg:w-auto lg:items-start lg:justify-between items-center">
          <div className="flex flex-col space-y-2 lg:space-y-4 text-center lg:text-left">
            <a href="#" className="text-xl font-bold hover:underline">Ayuda</a>
            <div className="flex flex-col lg:space-y-0">
              {/* Enlaces apilados verticalmente en desktop */}
              <a href="#" className="text-white hover:underline text-sm lg:text-base">Faqs</a>
              <a href="#" className="text-white hover:underline text-sm lg:text-base">Términos & Condiciones</a>
              <a href="#" className="text-white hover:underline text-sm lg:text-base">Política de privacidad</a>
            </div>
          </div>

          {/* Texto de copyright, alineado a la derecha en desktop */}
          <div className="text-center lg:text-right mt-4 lg:mt-12 lg:self-end">
            <p className="text-xs">© 2024, <span className="text-customGreen">Rural Market</span>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






  