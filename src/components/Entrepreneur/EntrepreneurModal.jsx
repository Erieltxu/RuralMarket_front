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

            <img
                src="https://via.placeholder.com/150" // Reemplaza esta URL con la imagen que desees
                alt="Open Modal"
                className="cursor-pointer" // El puntero cambiará a mano cuando pases el ratón sobre la imagen
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>


                    <div
                        className="relative bg-white p-8 rounded shadow-lg z-50"
                        role="dialog"
                        aria-modal="true"
                        ref={modalRef}
                        tabIndex={-1} // Permite enfocarse en el modal cuando se abre
                    >
                        <h2 className="text-lg font-semibold">This is a modal</h2>
                        <p>Some content inside the modal</p>
                        <button onClick={() => setIsOpen(false)} className="mt-4">
                            Close Modal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
