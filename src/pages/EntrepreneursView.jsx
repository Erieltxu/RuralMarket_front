import { useNavigate, useParams } from "react-router-dom";
import useApi from "../services/useApi";
import { USERS } from "../config/urls";
import EntrepreneurCard from "../components/frontPage/EntrepreneurCard";

const EntrepreneursView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: users,
    loading,
    error,
  } = useApi({
    apiEndpoint: USERS,
    method: "GET",
  });

  const entrepreneurs = users
    ? users.filter((user) => user.user_type === "seller")
    : [];
  const selectedEntrepreneur = entrepreneurs.find(
    (entrepreneur) => entrepreneur.id === parseInt(id)
  );

  const handleBackToList = () => {
    navigate("/nuestrasemprendedoras");
  };

  const handleViewProducts = (entrepreneurId) => {
    navigate(`/Store?seller=${entrepreneurId}`);
  };

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error al cargar emprendedoras: {error.message}</p>;

  if (id && selectedEntrepreneur) {
    return (
      <div className="max-w-4xl mx-auto mb-16 rounded-lg shadow-xl mt-24 border border-gray-300">
  <div className="bg-white rounded-lg p-8">
    <h2 className="text-4xl font-bold text-center mb-6">
      {selectedEntrepreneur.first_name}
    </h2>
    <div className="flex flex-col lg:flex-row items-center lg:items-start">
      <img
        src={selectedEntrepreneur.photo}
        alt={selectedEntrepreneur.first_name}
        className="w-64 h-64 object-cover rounded-lg mb-6 lg:mb-0 lg:mr-8"
      />
      <div className="text-lg text-gray-700 leading-relaxed max-w-2xl">
        <p>
          {selectedEntrepreneur.user_description ||
            "No hay descripción disponible."}
        </p>
        <a
          href={selectedEntrepreneur.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-4 block"
        >
          {selectedEntrepreneur.website || ""}
        </a>
      </div>
    </div>
    <div className="mt-8 flex justify-center space-x-4">
      <button
        className="bg-customGreen text-white py-2 px-4 rounded-xl hover:bg-customGreenL"
        onClick={handleBackToList}
      >
        Volver al listado
      </button>

      <button
        className="bg-customPurple text-white py-2 px-4 rounded-xl hover:bg-customPink"
        onClick={() => handleViewProducts(selectedEntrepreneur.id)}
      >
        Mis productos
      </button>
    </div>
  </div>
</div>


    );
  }

  return (
<div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4">
  <h2 className="text-3xl font-bold text-center mb-8">
    Nuestras Emprendedoras Rurales
  </h2>

  <div className="flex-1 overflow-y-auto w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
      {entrepreneurs.map((entrepreneur) => (
        <div key={entrepreneur.id} className="flex flex-col">
          <EntrepreneurCard
            name={`Hola, soy ${entrepreneur.first_name}`} 
            image={entrepreneur.photo}
          />
          <div className="mt-2 space-y-2">
            <button
              className="w-full bg-customGreen text-white py-2 rounded-full hover:bg-customGreenL" 
              onClick={() =>
                navigate(`/nuestrasemprendedoras/${entrepreneur.id}`)
              }
            >
              Más información
            </button>
            <button
              className="w-full bg-customPink text-white py-2 rounded-full" 
              onClick={() => handleViewProducts(entrepreneur.id)}
            >
              Productos
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default EntrepreneursView;
