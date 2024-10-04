import React from 'react';

function PasswordResetDone() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Verifica tu correo</h2>
        <p className="text-center text-gray-700">
          Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico, si está registrado.
        </p>
      </div>
    </div>
  );
}

export default PasswordResetDone;
