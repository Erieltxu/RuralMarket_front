import React, { useState, useEffect } from 'react';
import useApi from '../services/useApi';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../config/urls';
import arrowIcon from '/icons/arrow.svg'; // Importamos la flecha desde public/icons

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { data, loading, error: apiError } = useApi({
    apiEndpoint: submitted ? USER_LOGIN : null,
    method: 'POST',
    body: { username, password },
  });

  useEffect(() => {
    if (data) {
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      console.log('Token set in localStorage:', localStorage.getItem('token'));

      if (onLoginSuccess) {
        onLoginSuccess({ username }, data.token);
      }

      navigate('/HomeLogin');
    }
  }, [data, navigate, onLoginSuccess, username]);

  useEffect(() => {
    if (apiError) {
      setError('Login failed: ' + (apiError.message || 'Please check your credentials.'));
    }
  }, [apiError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBackToHome = () => {
    navigate('/'); // Acción de la flecha: Navega a la página de inicio
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Agregamos la flecha para regresar */}
        <div className="flex items-center mb-4">
          <img
            src={arrowIcon}  // Mostramos la flecha importada
            alt="Back Arrow"
            className="h-6 w-6 cursor-pointer"
            onClick={handleBackToHome}  // Lógica de redirección al hacer clic
          />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Iniciar sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre de usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-customGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
