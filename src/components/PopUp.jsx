import { useEffect } from "react";

const PopUp = ({ message, type, onClose }) => {

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 focus:outline-none`}
            tabIndex={-1} 
            onClick={onClose} // Esto cierra el popup al hacer clic afuera
        >
            <div 
                className={`relative p-8 w-full max-w-md bg-white rounded-lg shadow-md flex flex-col items-center focus:outline-none`} // Ajusté el padding, bordes, y sombra
                role="alert" 
                tabIndex={0}
            >
                {type === "success" ? (
                    <div className="text-customGreen text-5xl mb-4">
                        &#10004; {/* Tick de éxito */}
                    </div>
                ) : (
                    <div className="text-red-500 text-5xl mb-4">
                        &#10006; {/* X de error */}
                    </div>
                )}
                <p className="text-gray-700 text-lg font-semibold mb-4 text-center">{message}</p>
                <button 
                    className="w-full justify-center rounded-lg bg-customGreen px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default PopUp;