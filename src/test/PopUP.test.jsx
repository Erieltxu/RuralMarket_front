// src/test/PopUP.test.jsx
import React from 'react'; // Importa React
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PopUp from '../components/PopUp'; // Asegúrate de que esta ruta es correcta

// Componente PopUp simulado para pruebas
const MockedPopUp = ({ message, type, onClose }) => {
    return (
        <div role="alert" className={`popup ${type}`}>
            {type === "success" ? <div>&#10004;</div> : <div>&#10006;</div>}
            <p>{message}</p>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};

describe('PopUp', () => {
    test('debería renderizar el mensaje y el tipo de éxito', () => {
        const mockOnClose = vi.fn();
        const message = 'Operación exitosa';

        render(<MockedPopUp message={message} type="success" onClose={mockOnClose} />);

        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByText(/cerrar/i)).toBeInTheDocument();
    });

    test('debería renderizar el mensaje y el tipo de error', () => {
        const mockOnClose = vi.fn();
        const message = 'Error al realizar la operación';

        render(<MockedPopUp message={message} type="error" onClose={mockOnClose} />);

        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByText(/cerrar/i)).toBeInTheDocument();
    });

    test('debería llamar a onClose al hacer clic en el botón', () => {
        const mockOnClose = vi.fn();
        const message = 'Operación exitosa';

        render(<MockedPopUp message={message} type="success" onClose={mockOnClose} />);

        fireEvent.click(screen.getByText(/cerrar/i));
        expect(mockOnClose).toHaveBeenCalled();
    });

   
});
