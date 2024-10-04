import React from 'react';
import FrontPageCarousel from './FrontPageCarousel';
import ButtonGreen from '../ButtonGreen';
import { useNavigate } from 'react-router-dom';

const FrontPagePhoto = () => {
    const navigate = useNavigate();
    const images = [];

    return (
        <div className="p-8 rounded-lg w-full -mt-4">

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="col-span-2">
                    <div className="relative group h-[700px]">
                        <div className="relative overflow-hidden h-full border-2 border-transparent group-hover:border-green-500 transition-all duration-300 rounded-[15px]">
                            <img
                                src="../../../public/img/9.jpg"
                                alt="Productos Frescos y Sanos"
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-110"
                            />
                        </div>

                        <div className="absolute top-4 left-4 sm:left-4 flex flex-col items-start sm:items-end p-4 rounded-[5px] bg-customBlackTrans">
                            <div className="text-left sm:text-left text-white">
                                <h2 className="text-xl sm:text-3xl md:text-3xl lg:text-5xl font-bold mb-4">
                                    <span>Productos Frescos</span> <br />
                                    <span>& Sanos</span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center sm:hidden">
                        <ButtonGreen
                            backgroundColor="bg-customGreen"
                            textColor="text-white"
                            onClick={() => navigate('/product')}
                            className="px-4 py-2 text-md"
                        >
                            Compra ahora →
                        </ButtonGreen>
                    </div>

                    <div className="absolute left-4 hidden sm:flex top-32">
                        <ButtonGreen
                            backgroundColor="bg-white"
                            textColor="text-customGreen"
                            onClick={() => navigate('/product')}
                            className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl -mt-8"
                        >
                            Compra ahora →
                        </ButtonGreen>
                    </div>
                </div>

                <div className="hidden md:grid grid-rows-2 gap-8 w-full md:h-[700px]">
                    <div className="relative group">
                        <div className="relative overflow-hidden h-full border-2 border-transparent group-hover:border-green-500 transition-all duration-300 rounded-[15px]">
                            <img
                                src="../../../public/img/11.jpg"
                                alt="Frutas y Verduras"
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-110"
                            />
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="relative overflow-hidden h-full border-2 border-transparent group-hover:border-green-500 transition-all duration-300 rounded-[15px]">
                            <img
                                src="/img/10.jpg"
                                alt="Cesta de Productos"
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="hidden md:block">
                    <img
                        src="../../../public/img/6.jpg"
                        alt="Conoce a Rural Market"
                        className="w-[900px] h-full object-cover rounded-[15px]" // Esta imagen se mantiene sin borde ni hover
                    />
                </div>

                <div className="flex flex-col justify-center mt-8">
                    <h2 className="text-5xl font-bold mb-8 text-center">Conoce Rural Market</h2> {/* Cambié de mb-4 a mb-8 para más espacio */}
                    <p className="text-gray-700">
                        Rural Market es una web que facilita la visibilidad de las emprendedoras rurales la cual permite promocionar sus servicios o productos.
                        A través de nuestra plataforma, los consumidores pueden descubrir productos auténticos y de calidad, directamente desde las áreas rurales.
                        Además, fomentamos el desarrollo sostenible al conectar a las emprendedoras con un público más amplio y apoyar las economías locales.
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-4 hidden md:block">
                        <FrontPageCarousel images={images} />
                    </div>
                </div>
            </div>

            <div className="justify-center container mx-auto flex -mt-10">
                <img
                    src="/img/SectionHeading 2.png"
                    alt="icono header"
                    className="w-full h-auto object-cover rounded-lg items-center"
                />
            </div>

        </div>
    );
};

export default FrontPagePhoto;
