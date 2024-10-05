import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Formulario enviado:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto mb-16 rounded-lg shadow-xl mt-16 border border-gray-300"> 
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contacto</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="5"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-customGreen px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreenL focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center text-green-500 font-bold">
            ¡Gracias por contactarnos! Te responderemos pronto.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
