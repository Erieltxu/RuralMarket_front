import React from 'react';
import { render, screen, fireEvent,  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Login from '../pages/Login';
import useApi from '../services/useApi';
import { vi } from 'vitest';



vi.mock('../services/useApi', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: null,
    loading: false,
    error: null,
  })),
}));


const mockNavigate = vi.fn(); 
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

describe('Componente Login', () => {
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  test('renderiza el componente de inicio de sesión y navega al registro', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), {
      target: { value: 'usuarioPrueba' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'ContraseñaValida123' },
    });

    
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    
    expect(useApi).toHaveBeenCalled(); 

  test('navega a la página de registro al hacer clic en "Regístrate"', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

   
    fireEvent.click(screen.getByText(/Regístrate/i));

   
    expect(mockNavigate).toHaveBeenCalledWith('/registro');
  });
});
});
