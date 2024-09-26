import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../services/useApi';
import { USERS_REGISTER } from '../config/urls';
import arrowIcon from '/icons/arrow.svg';
import eyeIcon from '/icons/eye.svg';
import eyeOffIcon from '/icons/eye-off.svg';

function Register() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [userType] = useState('buyer'); 
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { data, loading, error: apiError } = useApi({
    apiEndpoint: submitted ? USERS_REGISTER : null,
    method: 'POST',
    body: { username, email, password, user_type: userType },
    headers: { 'Content-Type': 'application/json' },
  });

  useEffect(() => {
    if (data) {
      navigate('/iniciosesion');
    }
  }, [data, navigate]);

  useEffect(() => {
    if (apiError) {
      setError('Error en el registro: ' + (apiError.message || 'Inténtalo de nuevo.'));
    }
  }, [apiError]);

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword()) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      return;
    }

    setSubmitted(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/iniciosesion');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src={arrowIcon}
            alt="Back Arrow"
            className="h-6 w-6 cursor-pointer"
            onClick={handleBackToHome}
          />
        </div>

        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center mb-4">
          Crear cuenta
        </h2>

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
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <img
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Toggle Password Visibility"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
              Repetir contraseña
            </label>
            <div className="mt-2 relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repetir contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <img
                src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                alt="Toggle Confirm Password Visibility"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          <input
            id="userType"
            name="userType"
            type="hidden"
            value={userType}
          />

          <div>
            <label htmlFor="userType" className="block text-sm font-medium leading-6 text-gray-900">
              Tipo de usuario
            </label>
            <div className="mt-2">
              <div className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                Comprador
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {loading && <p className="text-sm text-gray-600">Registrando...</p>}
          {data && <p className="text-sm text-green-600">Registro exitoso</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl bg-customGreen px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              Crear cuenta
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Ya tienes una cuenta?{' '}
              <span
                onClick={handleLoginRedirect}
                className="font-bold cursor-pointer text-indigo-600 hover:underline"
              >
                Inicia sesión
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
