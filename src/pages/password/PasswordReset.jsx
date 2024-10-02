import React, { useState, useEffect } from 'react';
import UseApi from '../../services/useApi'; // Asegúrate de que la función personalizada UseApi esté correcta
import axios from 'axios';
import { getCsrfToken } from '../../utils/getCsrfToken'; // Asegúrate de que esta función esté correctamente implementada

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Obtén el token CSRF cuando el componente se monta
    const token = getCsrfToken();
    setCsrfToken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/password_reset/',
        { email },
        {
          headers: {
            'X-CSRFToken': csrfToken,  // Asegúrate de que el token CSRF se está enviando correctamente
            'Content-Type': 'application/json',
          },
          withCredentials: true,  // Necesario para enviar las cookies al backend
        }
      );
      setMessage('Correo enviado con éxito.');
    } catch (error) {
      setMessage('Error al enviar el correo. Inténtalo nuevamente.');
      console.error('Error al enviar correo:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Enviar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

export default PasswordReset;
