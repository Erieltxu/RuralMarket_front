import React from 'react'
import FrontPageCarousel from './FrontPageCarousel';
import ButtonGreen from '../ButtonGreen';
import { useNavigate } from 'react-router-dom';

const FrontPagePhoto = () => {
    const navigate = useNavigate();
    const images = [
        // "/img/jams.jpg",
        "/img/home1.png",
        "/img/home1.png",
        "/img/home1.png",
        "/img/home1.png",
    ];

    return (
        <div className=" p-8 rounded-lg w-full -mt-4">

            <div className=" relative grid grid-cols-1 md:grid-cols-3 gap-4 ">

                <div className=" col-span-2">
                    <img
                        src="/img/home0.png"
                        alt="Productos Frescos y Sanos"
                        className="h-[700px] w-full object-cover rounded-lg rounded-[15px]"
                    />

                    <div className="absolute top-4 left-4 sm:left-4 flex flex-col items-start sm:items-end p-4 rounded-lg">
                        <div className="text-left sm:text-left text-white">
                            {/* Frase dividida en dos líneas */}
                            <h2 className="text-xl sm:text-3xl md:text-3xl lg:text-5xl font-bold mb-4">
                                <span>Productos Frescos</span> <br />
                                <span>& Sanos</span>
                            </h2>
                        </div>
                    </div>


                    <div className="mt-4 flex justify-center sm:hidden">
                        <ButtonGreen
                            backgroundColor="bg-green-500"
                            textColor="text-white"
                            onClick={() => navigate('/product')}
                            className="px-4 py-2 text-sm"
                        >
                            Compra ahora →
                        </ButtonGreen>
                    </div>

                    <div className="absolute left-4 hidden sm:flex top-32">
                        <ButtonGreen
                            backgroundColor="bg-white"
                            textColor="text-green-500"
                            href="/product"
                            className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl -mt-8"
                        >
                            Compra ahora →
                        </ButtonGreen>
                    </div>


                </div>

                <div className="grid grid-rows-2 gap-4 h-[700px] w-full">

                    <img
                        src="/img/home0.png"
                        alt="Frutas y Verduras"
                        className="w-full h-full object-cover rounded-lg hidden md:block rounded-[15px]"
                    />
                    <img
                        src="/img/home0.png"
                        alt="Cesta de Productos"
                        className="w-full h-full object-cover rounded-lg hidden md:block rounded-[15px]"
                    />
                </div>

            </div>


            <div className=" relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-4  ">
                <div className="hidden md:block  ">
                     
                        <img
                            src="/img/home1.png"
                            alt="Conoce a Rural Market"
                            className=" w-[900px] h-full object-cover -lg rounded-[15px]"
                        />
                    
                </div>
                <div className="flex flex-col justify-center ">
                    <h2 className="text-3xl font-bold mb-4">Conoce a Rural Market</h2>
                    <p className="text-gray-700">rounded
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <p className="text-gray-700 mt-4">
                        Dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque.
                    </p>
                    <div className="mt-8 grid grid-cols-3 gap-4 hidden md:block">

                        <FrontPageCarousel images={images} />

                    </div>

                </div>

            </div>
            
            <div className=' justify-center container mx-auto flex -mt-10'>
                <img
                    src="/img/SectionHeading 2.png"
                    alt="icono  header"
                    className="w-full h-auto object-cover rounded-lg items-center "
                />
            </div>

        </div>
    );
};

export default FrontPagePhoto;