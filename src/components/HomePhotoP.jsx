import React from 'react'

const HomePhotoP = () => {
  return (

    <div className="container mx-auto px-4 py-8">
      {/* Sección de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src="ruta-imagen-principal.jpg"
            alt="Productos Frescos y Sanos"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold">Productos Frescos & Sanos</h2>
              <a
                href="/comprar"
                className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Compra ahora →
              </a>
            </div>
          </div>
        </div>

        {/* Imágenes pequeñas */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="ruta-imagen-secundaria-1.jpg"
            alt="Frutas y Verduras"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src="ruta-imagen-secundaria-2.jpg"
            alt="Cesta de Productos"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Sección de texto */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src="ruta-imagen-conoce.jpg"
            alt="Conoce a Rural Market"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Conoce a Rural Market</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
          </p>
          <p className="text-gray-700 mt-4">
            Dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque.
          </p>
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <img
          src="ruta-imagen-galeria-1.jpg"
          alt="Imagen galería 1"
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="ruta-imagen-galeria-2.jpg"
          alt="Imagen galería 2"
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="ruta-imagen-galeria-3.jpg"
          alt="Imagen galería 3"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
 

  )
}

export default HomePhotoP