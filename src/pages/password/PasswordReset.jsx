import React, { useState, useEffect } from 'react';
import UseApi from '../../services/useApi'; // Asumo que tienes el hook UseApi en un archivo aparte

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [submitRequest, setSubmitRequest] = useState(false); // Estado para controlar cuándo enviar la solicitud
  const [message, setMessage] = useState('');

  // Usa UseApi para hacer la solicitud POST solo cuando submitRequest sea true
  const { data, loading, error } = UseApi({
    apiEndpoint: 'http://localhost:8000/api/users/password_reset/', // Asegúrate de que esta URL sea correcta
    method: 'POST',
    body: { email: 'tu-email@ejemplo.com' }, // Asegúrate de que el cuerpo sea el correcto
});

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitRequest(true); // Esto activará la solicitud en UseApi
  };

  // Monitorear el resultado de la API para mostrar mensajes de éxito o error
  useEffect(() => {
    if (!loading && !error && data) {
      setMessage('Email enviado con instrucciones para restablecer la contraseña.');
    } else if (error) {
      setMessage('Error al enviar el correo. Inténtalo nuevamente.');
    }
  }, [data, loading, error]);

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordReset;
