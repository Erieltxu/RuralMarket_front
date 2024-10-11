import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/password_reset_confirm/`,
        `http://localhost:8000/api/users/password_reset_confirm/`,
        {
          uid,
          token,
          new_password: newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      setMessage("Contraseña restablecida correctamente.");
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setMessage("Error al restablecer la contraseña. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-16 rounded-lg shadow-xl mt-24 border border-gray-300">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-customGreen rounded-xl shadow-sm ${
              loading ? 'bg-opacity-50' : 'hover:bg-customGreenL'
            }`}
          >
            {loading ? 'Restableciendo...' : 'Restablecer'}
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

export default PasswordResetConfirm;
