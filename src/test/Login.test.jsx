import React from 'react';
import { render, screen, fireEvent,  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Login from '../pages/Login';
import useApi from '../services/useApi';
import { vi } from 'vitest';



// Mock del módulo useApi
vi.mock('../services/useApi', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: null,
    loading: false,
    error: null,
  })),
}));

// Mock de react-router-dom para simular la navegación
const mockNavigate = vi.fn(); 
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

describe('Componente Login', () => {
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  // Escenario: Renderiza el componente de inicio de sesión
  test('renderiza el componente de inicio de sesión y navega al registro', () => {
    // Dado que estoy en la página de inicio de sesión
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Entonces debería ver el botón "Iniciar sesión"
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    
    // Y debería ver los campos de nombre de usuario y contraseña
    expect(screen.getByPlaceholderText(/Nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();

    // Cuando ingreso un nombre de usuario y contraseña válidos
    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), {
      target: { value: 'usuarioPrueba' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'ContraseñaValida123' },
    });

    // Y hago clic en el botón "Iniciar sesión"
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Entonces debería haber llamado a useApi
    expect(useApi).toHaveBeenCalled();
  });

  // Escenario: Navega a la página de registro
  test('navega a la página de registro al hacer clic en "Regístrate"', () => {
    // Dado que estoy en la página de inicio de sesión
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Cuando hago clic en el enlace "Regístrate"
    fireEvent.click(screen.getByText(/Regístrate/i));

    // Entonces debería haber navegado a la página de registro
    expect(mockNavigate).toHaveBeenCalledWith('/registro');
  });
});
