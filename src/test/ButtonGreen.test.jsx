import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGreen from '../components/ButtonGreen';  // Ajusta la ruta según tu estructura de proyecto
import { vi } from 'vitest';

describe("ButtonGreen Component", () => {
  
  test("debería renderizar el texto dentro del botón", () => {
    render(
      <ButtonGreen backgroundColor="bg-green-500" textColor="text-white">
        Click me
      </ButtonGreen>
    );

    // Verificar que el texto se renderiza correctamente
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });

  test("debería ejecutar la función onClick cuando se hace clic en el botón", () => {
    const onClickMock = vi.fn();

    render(
      <ButtonGreen backgroundColor="bg-green-500" textColor="text-white" onClick={onClickMock}>
        Click me
      </ButtonGreen>
    );

    // Hacer clic en el botón
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);

    // Verificar que la función onClick se haya llamado
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("debería aplicar correctamente las clases dinámicas para backgroundColor y textColor", () => {
    const { container } = render(
      <ButtonGreen backgroundColor="bg-green-500" textColor="text-white">
        Click me
      </ButtonGreen>
    );

    // Verificar que las clases dinámicas se aplican correctamente
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-green-500');
    expect(button).toHaveClass('text-white');
  });

});
