import React from 'react'; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../services/useApi";
import { USER_LOGIN, USER_DETAIL } from "../config/urls";
import eyeIcon from "/icons/eye.svg";
import eyeOffIcon from "/icons/eye-off.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    loading,
    error: apiError,
  } = useApi({
    apiEndpoint: submitted ? USER_LOGIN : null,
    method: "POST",
    body: { username, password },
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem("token", data.token);
      console.log(
        "Token almacenado en localStorage:",
        localStorage.getItem("token")
      );
      window.dispatchEvent(new Event("storage"));

      const fetchUserDetails = async () => {
        const response = await fetch(USER_DETAIL, {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        });
        const userDetails = await response.json();
        localStorage.setItem("user_type", userDetails.user_type);
        window.location.href = "/";
      };

      fetchUserDetails();
    }
  }, [data, navigate]);

  useEffect(() => {
    if (apiError) {
      setError(
        "Error en el login: " + (apiError.message || "Inténtalo de nuevo.")
      );
      setSubmitted(false);
    }
  }, [apiError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleRegisterRedirect = () => {
    navigate("/registro");
  };

  const handleForgotPassword = () => {
    navigate("/password_reset");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto mb-16 mt-24">
      <div className="bg-white shadow-xl border border-gray-300 rounded-lg p-8">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center mb-4">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre de usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contraseña
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="password"
                className="block w-full rounded-xl border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <img
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Mostrar/Ocultar contraseña"
                className="absolute inset-y-0 right-0 h-5 w-5 cursor-pointer mr-3 mt-2.5"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {loading && (
            <p className="text-sm text-gray-600">Iniciando sesión...</p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl bg-customGreen px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              Iniciar sesión
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <span
                onClick={handleRegisterRedirect}
                className="font-bold cursor-pointer text-customPink"
              >
                Regístrate
              </span>
            </p>
          </div>

          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600">
              ¿Ha olvidado su contraseña?{" "}
              <span
                onClick={handleForgotPassword}
                className="font-bold cursor-pointer text-customPink"
              >
                Haz click aquí
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
