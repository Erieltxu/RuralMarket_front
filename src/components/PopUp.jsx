import { useNavigate } from "react-router-dom";

const PopUp = ({ message, type, onClose, showCreateAccountButton }) => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/iniciosesion");
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 focus:outline-none`}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className={`relative p-4 sm:p-6 md:p-8 w-11/12 sm:w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-md flex flex-col items-center focus:outline-none`}
        role="alert"
        tabIndex={0}
      >
        {type === "success" ? (
          <div className="text-customGreen text-4xl sm:text-5xl mb-4">
            &#10004;
          </div>
        ) : (
          <div className="text-red-500 text-4xl sm:text-5xl mb-4">&#10006;</div>
        )}
        <p className="text-gray-700 text-base sm:text-lg font-semibold mb-4 text-center">
          {message}
        </p>
        <button
          className="w-full justify-center rounded-[5px] bg-customGreen px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onClose}
        >
          Cerrar
        </button>
        {showCreateAccountButton && type === "error" && (
          <button
            className="w-full justify-center rounded-[5px] bg-customGreen px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-customGreenL mt-4"
            onClick={handleCreateAccount}
          >
            Inicia sesión
          </button>
        )}
      </div>
    </div>
  );
};

export default PopUp;
