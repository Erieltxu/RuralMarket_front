import { useState } from "react";
import axios from "axios";

function getCsrfToken() {
  let csrfToken = null;
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    if (cookie.trim().startsWith("csrftoken=")) {
      csrfToken = cookie.split("=")[1];
    }
  });
  return csrfToken;
}

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const csrfToken = getCsrfToken();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/password_reset/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      setMessage("Correo de restablecimiento de contraseña enviado.");
    } catch (error) {
      console.error("Error al enviar correo:", error);
      setMessage("Error al enviar el correo. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-16 rounded-lg shadow-xl mt-24 border border-gray-300">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-xl bg-customGreen px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreenL ${
                loading ? "bg-opacity-50" : ""
              }`}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
