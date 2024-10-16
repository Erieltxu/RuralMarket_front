const Footer = () => {
  return (
    <footer className="bg-customPurple text-white py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="flex flex-col mb-6 lg:mb-0 lg:max-w-md lg:pr-8 items-center lg:items-start">
          <div className="flex items-center mb-4 justify-center lg:justify-start">
            <img
              src="/img/rmPlant.png"
              alt="Rural Market Logo"
              className="h-8 mr-3"
            />
            <span className="text-2xl lg:text-xl font-bold">Rural Market</span>
          </div>

          <div className="hidden lg:block text-center lg:text-left">
            <p className="mb-4 text-sm lg:text-base text-white lg:max-w-md">
              Rural Market es una web que facilita la visibilidad de las
              emprendedoras rurales la cual permite promocionar sus servicios o
              productos
            </p>
            <a
              href="mailto:proxy@gmail.com"
              className="bg-customGreen text-white px-4 py-2 font-semibold rounded-xl hover:bg-customGreenL w-max"
            >
              ruralmarket24@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-auto lg:items-start lg:justify-between items-center">
          <div className="flex flex-col space-y-2 lg:space-y-4 text-center lg:text-left">
            <span className="text-2xl lg:text-xl font-bold hover:underline">
              Ayuda
            </span>
            <div className="flex flex-col lg:space-y-0">
              <a
                href="#"
                className="text-white hover:underline text-sm lg:text-base"
              >
                Faqs
              </a>
              <a
                href="/politica_privacidad"
                className="text-white hover:underline text-sm lg:text-base"
              >
                Términos & Condiciones
              </a>
              <a
                href="#"
                className="text-white hover:underline text-sm lg:text-base"
              >
                Política de privacidad
              </a>
              <p className="text-xs lg:text-base">
                © 2024, <span className="text-customGreen">Rural Market</span>.
                Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
