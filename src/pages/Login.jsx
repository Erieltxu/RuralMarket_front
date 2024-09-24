import React, { useState, useEffect } from 'react';
import useApi from '../services/useApi';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../config/urls';
import arrowIcon from '/icons/arrow.svg'; // Importamos la flecha
import eyeIcon from '/icons/eye.svg'; // Importamos el icono del ojito
import eyeOffIcon from '/icons/eye-off.svg'; // Importamos el icono del ojito cerrado

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
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
      localStorage.setItem('token', data.token);

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
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center mb-4">
          <img
            src={arrowIcon}
            alt="Back Arrow"
            className="h-6 w-6 cursor-pointer"
            onClick={handleBackToHome}
          />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Acceso
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
              />
              <img
                src={showPassword ? eyeOffIcon : eyeIcon} 
                alt="Toggle Password Visibility"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={togglePasswordVisibility}  
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
          ¿No estás registrado?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
