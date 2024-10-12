import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGreen from '../components/ButtonGreen';  
import { vi } from 'vitest';

describe("ButtonGreen Component", () => {
  
  test("debería renderizar el texto dentro del botón", () => {
    render(
      <ButtonGreen backgroundColor="bg-green-500" textColor="text-white">
        Click me
      </ButtonGreen>
    );

    
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });

  test("debería ejecutar la función onClick cuando se hace clic en el botón", () => {
    const onClickMock = vi.fn();

    render(
      <ButtonGreen backgroundColor="bg-green-500" textColor="text-white" onClick={onClickMock}>
        Click me
      </ButtonGreen>
    );

   
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);

    
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("debería aplicar correctamente las clases dinámicas para backgroundColor y textColor", () => {
    const { container } = render(
      <ButtonGreen backgroundColor="bg-green-500" textColor="text-white">
        Click me
      </ButtonGreen>
    );

    
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-green-500');
    expect(button).toHaveClass('text-white');
  });

});
