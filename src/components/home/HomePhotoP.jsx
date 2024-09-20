import React from 'react';
import ButtonGreen from '../ButtonGreen';
import PhotoCarousel from './PhotoCarousel';


const HomePhotoP = () => {
    // Define la lista de imágenes correctamente como una variable
    const images = [
        "/img/jams.jpg",
        "/img/home1.png",
        "/img/home1.png",
        "/img/home1.png",
        "/img/home1.png",
    ];

    return (
        <div className="container mx-auto px-4 py-8 ">
          
            <div className="container mx-auto px-4 py-8">
               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="relative col-span-2">
                        
                        <img
                            src="/img/home2.png"
                            alt="Productos Frescos y Sanos"
                            className="w-full h-auto object-cover rounded-lg"
                        />

                        
                        <div className="absolute top-4 left-4 flex flex-col items-start bg-black bg-opacity-40 p-4 rounded-lg">
                            <div className="text-left text-white">
                                {/* Frase dividida en dos líneas */}
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                    <span>Productos Frescos</span> <br />
                                    <span>& Sanos</span>
                                </h2>

                                {/* Botón responsive */}
                                <ButtonGreen
                                    backgroundColor="bg-white"
                                    textColor="text-green-500"
                                    href="/comprar"
                                    className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
                                >
                                    Compra ahora →
                                </ButtonGreen>
                            </div>
                        </div>
                    </div>


                    {/* Dos imágenes pequeñas a la derecha */}
                    <div className="grid grid-rows-2 gap-4">
                        <img
                            src="/img/home3.png"
                            alt="Frutas y Verduras"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <img
                            src="/img/home4.png"
                            alt="Cesta de Productos"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Sección de texto */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src="/img/home1.png"
                        alt="Conoce a Rural Market"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Conoce a Rural Market</h2>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <p className="text-gray-700 mt-4">
                        Dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque.
                    </p>
                    <div className="mt-8 grid grid-cols-3 gap-4 ">

                        <PhotoCarousel images={images} />

                    </div>

                </div>

            </div>
            <div className=' justify-center container mx-auto px-4 py-8 flex -mt-12'>
                <img
                    src="/img/SectionHeading 2.png"
                    alt="icono  header"
                    className="w-full h-auto object-cover rounded-lg items-center mt-6"
                />
            </div>

        </div>
    );
};

export default HomePhotoP;
