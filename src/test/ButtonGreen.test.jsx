import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonGreen from '../components/ButtonGreen'; 
import '@testing-library/jest-dom'; 

describe('ButtonGreen', () => {
    test('debería ejecutar la función onClick cuando se hace clic en el botón', () => {
        const backgroundColor = 'bg-green-500'; 
        const textColor = 'text-white'; 
        const mockOnClick = vi.fn(); 

        render(
            <ButtonGreen backgroundColor={backgroundColor} textColor={textColor} onClick={mockOnClick}>
                Click me
            </ButtonGreen>
        );

        
        const button = screen.getByText('Click me');
        expect(button).toBeInTheDocument();

        
        fireEvent.click(button);

       
        expect(mockOnClick).toHaveBeenCalled();
    });
});
