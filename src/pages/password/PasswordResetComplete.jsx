function PasswordResetComplete() {
  return (
    <div className="max-w-md mx-auto mb-16 rounded-lg shadow-xl mt-24 border border-gray-300">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contraseña restablecida</h2>
        <p className="text-gray-700 text-center">
          Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
        </p>
      </div>
    </div>
  );
}

export default PasswordResetComplete;
