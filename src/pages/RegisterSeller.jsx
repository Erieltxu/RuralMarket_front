import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../services/useApi';
import { USERS_REGISTER } from '../config/urls';
import arrowIcon from '/icons/arrow.svg';
import eyeIcon from '/icons/eye.svg';
import eyeOffIcon from '/icons/eye-off.svg';
import PopUp from '../components/PopUp';


function RegisterSeller() {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [userType] = useState('seller');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data, loading: apiLoading, error: apiError } = useApi({
    apiEndpoint: submitted ? USERS_REGISTER : null,
    method: 'POST',
    body: {
      first_name: firstName,
      username,
      email,
      password,
      phone,
      address,
      province,
      zip_code: postalCode,
      user_description: description,
      user_type: userType,
      photo
    },
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  useEffect(() => {
    if (apiError && apiError.response?.data) {
      const responseErrors = apiError.response.data;
      if (responseErrors.username) {
        setError(`Error en el registro: ${responseErrors.username[0]}`);
      } else if (responseErrors.first_name) {
        setError(`Error en el registro: ${responseErrors.first_name[0]}`);
      } else if (responseErrors.email) {
        setError(`Error en el registro: ${responseErrors.email[0]}`);
      } else if (responseErrors.phone) {
        setError(`Error en el registro: ${responseErrors.phone[0]}`);
      } else {
        setError('Error en el registro: Inténtalo de nuevo.');
      }
    } else if (apiError) {
      setError('Error en el registro: Inténtalo de nuevo.');
    } else if (data) {
      // Si el registro es exitoso
      setShowPopup(true); // Mostrar el popup de éxito
    }
  }, [apiError, data]);

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Resetear el mensaje de error antes de validar

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword()) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      return;
    }

    if (phone.length !== 9) {
      setError('El teléfono debe tener exactamente 9 dígitos.');
      return;
    }

    if (description.length > 1000) {
      setError('La descripción no debe superar los 1000 caracteres.');
      return;
    }

    setSubmitted(true);


  };

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
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

  const closePopup = () => {
    setShowPopup(false);
    navigate('/iniciosesion'); // Redirige al inicio de sesión después de cerrar el popup
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-100">
      <div className="w-full max-w-md h-full max-h-[90vh] overflow-y-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-start mb-4">
          <img
            src={arrowIcon}
            alt="Back Arrow"
            className="h-6 w-6 cursor-pointer"
            onClick={handleBackToHome}
          />
        </div>

        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center mb-4">
          Crear cuenta de Vendedora
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Nombre */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Campo de Nombre de usuario */}
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

          {/* Campo de Correo electrónico */}
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
                className={`border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
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
                className={`border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
              />
              {error.confirmPassword && <span className="text-red-500">{error.confirmPassword}</span>}
              <img
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Mostrar/Ocultar contraseña"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirmar Contraseña
            </label>
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <img
                src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                alt="Mostrar/Ocultar contraseña"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          {/* Campo de Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Campo de Dirección */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Dirección
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Campo de Provincia */}
          <div>
            <label htmlFor="province" className="block text-sm font-medium leading-6 text-gray-900">
              Provincia
            </label>
            <div className="mt-2">
              <input
                id="province"
                name="province"
                type="text"
                placeholder="Provincia"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Campo de Código Postal */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
              Código Postal
            </label>
            <div className="mt-2">
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                placeholder="Código Postal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Campo de Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Descripción
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="1000"
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Campo de Foto */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Foto (opcional)
            </label>
            <div className="mt-2">
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-xl bg-customGreen px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrar'}
          </button>

          {/* Mensaje de error */}
          {error && (
            <div className="text-red-600 text-sm mt-2">
              {error}
            </div>
          )}
        </form>

        {/* Popup de éxito */}
        {showPopup && (
          <PopUp
            onClose={closePopup}
            message="¡Registro exitoso! Redirigiendo al inicio de sesión..."
            type="success"  // Aquí especificas que es de tipo éxito
          />
        )}
      </div>
    </div>
  );
}

export default RegisterSeller;
