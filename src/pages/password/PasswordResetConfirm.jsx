import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams(); // Obtén uid y token de la URL
  const [newPassword, setNewPassword] = useState('');
  const [submitRequest, setSubmitRequest] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación de la nueva contraseña
    if (newPassword.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/password_reset_confirm/`, // Asegúrate de tener esta URL en tu backend
        {
          uid,
          token,
          new_password: newPassword // El nombre del campo debe coincidir con lo que espera tu backend
        },
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          }
        }
      );
      setMessage('Contraseña restablecida correctamente.');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setMessage('Error al restablecer la contraseña. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nueva Contraseña:
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Restableciendo...' : 'Restablecer'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
