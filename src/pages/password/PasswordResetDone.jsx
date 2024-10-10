import React from 'react';

function PasswordResetDone() {
  return (
    <div className="max-w-md mx-auto mb-16 rounded-lg shadow-xl mt-24 border border-gray-300">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Verifica tu correo</h2>
        <p className="text-center text-gray-700">
          Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico, si está registrado.
        </p>
      </div>
    </div>
  );
}

export default PasswordResetDone;
