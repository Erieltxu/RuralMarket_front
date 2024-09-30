import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../services/useApi'; 
import { USERS_REGISTER } from '../config/urls'; 
import arrowIcon from '/icons/arrow.svg'; 
import eyeIcon from '/icons/eye.svg'; 
import eyeOffIcon from '/icons/eye-off.svg'; 

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
  const navigate = useNavigate();

  const { data, loading, error: apiError } = useApi({
    apiEndpoint: submitted ? USERS_REGISTER : null, 
    method: 'POST',
    body: { first_name: firstName, username, email, password, phone, address, province, zip_code: postalCode, user_description: description, user_type: userType, photo },
    headers: { 'Content-Type': 'multipart/form-data' },
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

    if (phone.length !== 9) {
      setError('El teléfono debe tener exactamente 9 dígitos.');
      return;
    }

    if (description.length > 700) {
      setError('La descripción no debe superar los 700 caracteres.');
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
          {/* Campo de Nombre de usuario */}
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
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <img
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Mostrar/Ocultar contraseña"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {/* Campo de Repetir contraseña */}
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
                alt="Mostrar/Ocultar confirmar contraseña"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          {/* Campo oculto para el tipo de usuario (vendedora) */}
          <input
            id="userType"
            name="userType"
            type="hidden"
            value={userType} 
          />

          {/* Campo de Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength={9}
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
      placeholder="Descripción (máximo 700 caracteres)"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      maxLength={700}
      required
      className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
    />
  </div>
</div>

{/* Campo de Foto */}
<div>
  <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
    Foto de perfil
  </label>
  <div className="mt-2">
    <input
      id="photo"
      name="photo"
      type="file"
      accept="image/*"
      onChange={handlePhotoUpload}
      required
      className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
    />
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
    Crear cuenta de Vendedora
  </button>
</div>

<div className="mt-4 text-center">
  <p className="text-sm text-gray-600">
    ¿Ya tienes una cuenta?{' '}
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

export default RegisterSeller;

         
