import { useState, useRef, useEffect } from 'react';

function Modal() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div>

            <div className=" mb-5 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 overflow-hidden rounded-lg mx-auto"> {/* Nuevo div para redimensionar la imagen */}
                <img
                    src="../../../public/img/textil-barna.jpg" // Reemplaza esta URL con la imagen que desees
                    alt="Open Modal"
                    className="cursor-pointer object-cover w-full h-full" // Asegura que la imagen se ajuste al cuadrado
                    onClick={() => setIsOpen(true)}
                />
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>


                    <div
                        className="relative bg-white p-8 rounded shadow-lg z-50  max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
                        role="dialog"
                        aria-modal="true"
                        ref={modalRef}
                        tabIndex={-1} // Permite enfocarse en el modal cuando se abre
                    >
                        <h2 className="text-lg font-semibold text-left ml-4">Montse</h2>
                        <p className="mt-4 text-left ml-4 mr-4">Soy Montse, fundadora de Textil Barna, un proyecto que nace de mi pasión por la moda 
                            sostenible y el respeto al medio ambiente. En mi emprendimiento, nos especializamos en la creación 
                            de ropa artesanal utilizando tejidos ecológicos y técnicas tradicionales. Cada pieza es única, 
                            creada con mucho cariño, apoyando a pequeños productores locales. Mi objetivo es ofrecer moda 
                            consciente, de alta calidad, que refleje estilo y responsabilidad social, para que vestir bien 
                            también sea cuidar el planeta.</p>
                        <button onClick={() => setIsOpen(false)} className="mt-4 ml-4">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
