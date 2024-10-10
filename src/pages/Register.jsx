import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../services/useApi';
import { USERS_REGISTER } from '../config/urls';
import { checkUsernameExists, checkEmailExists, checkFirstNameExists } from '../services/userService';
import arrowIcon from '/icons/arrow.svg';
import eyeIcon from '/icons/eye.svg';
import eyeOffIcon from '/icons/eye-off.svg';
import PopUp from '../components/PopUp';

function Register() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const navigate = useNavigate();

  const { data, loading, error: apiError } = useApi({
    apiEndpoint: submitted ? USERS_REGISTER : null,
    method: 'POST',
    body: { username, first_name: firstName, phone, address, email, password, user_type: userType },
    headers: { 'Content-Type': 'application/json' },
  });

  useEffect(() => {
    if (data) {
      setPopupMessage('¡Cuenta creada con éxito!');
      setPopupType('success');
      setShowPopup(true);

      setTimeout(() => {
        navigate('/iniciosesion');
      }, 2000);
    }
  }, [data, navigate]);

  useEffect(() => {
    if (apiError) {
      setPopupMessage(apiError.message || 'Error en el registro. Inténtalo de nuevo.');
      setPopupType('error');
      setShowPopup(true);
    }
  }, [apiError]);

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setPopupMessage('Las contraseñas no coinciden');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    if (!validatePassword()) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      setPopupMessage('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    try {
    
      await checkUsernameExists(username);
      await checkEmailExists(email);
      await checkFirstNameExists(firstName);

    
      setSubmitted(true);
    } catch (error) {
      setError(error.message);
      setPopupMessage(error.message);
      setPopupType('error');
      setShowPopup(true);
    }
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
              />
            </div>
          </div>

  
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
              />
            </div>
          </div>

       
          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Dirección
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
              />
            </div>
          </div>

          
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
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
            <div className="relative mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-xl border-2 border-gray-300 py-2 px-4 text-gray-900"
              />
              <img
                src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                alt="Toggle Confirm Password Visibility"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

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
              ¿Ya tienes una cuenta?{' '}
              <span
                onClick={handleLoginRedirect}
                className="font-bold cursor-pointer text-customPurple"
              >
                Inicia sesión
              </span>
            </p>
          </div>
        </form>

        {showPopup && (
          <PopUp message={popupMessage} type={popupType} onClose={() => setShowPopup(false)} />
        )}
      </div>
    </div>
  );
}

export default Register;
