import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UseApi from '../../services/useApi';

function PasswordResetConfirm() {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [submitRequest, setSubmitRequest] = useState(false);
  const [message, setMessage] = useState('');

  const { data, loading, error } = UseApi({
    apiEndpoint: submitRequest ? `/reset/${uid}/${token}/` : null,
    method: 'POST',
    body: { password: newPassword },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitRequest(true);
  };

  useEffect(() => {
    if (!loading && !error && data) {
      setMessage('Contraseña restablecida correctamente.');
    } else if (error) {
      setMessage('Error al restablecer la contraseña.');
    }
  }, [data, loading, error]);

  return (
    <div>
      <h2>Restablecer contraseña</h2>
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
}

export default PasswordResetConfirm;
