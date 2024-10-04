import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Función para obtener el token CSRF de las cookies
function getCsrfToken() {
  let csrfToken = null;
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    if (cookie.trim().startsWith('csrftoken=')) {
      csrfToken = cookie.split('=')[1];
    }
  });
  return csrfToken;
}

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const csrfToken = getCsrfToken();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/password_reset/',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Asegúrate de enviar el token CSRF
          },
          withCredentials: true, // Asegúrate de que las cookies se envíen con la solicitud
        }
      );
      setMessage('Correo de restablecimiento de contraseña enviado.');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      setMessage('Error al enviar el correo. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-customGreen rounded-xl shadow-sm ${
              loading ? 'bg-opacity-50' : 'hover:bg-customGreenL'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
