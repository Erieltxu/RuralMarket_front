import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ContactPage from "../pages/ContactPage";
import RegisterSeller from "../pages/RegisterSeller";

import Product from "../components/createProduct/ProductList"
import ProductStore from "../components/Store/ProductStore";
import Store from "../pages/Store";
import ProductManager from "../components/createProduct/ProductManager";


// Función handleLogout que maneja el cierre de sesión
const handleLogout = () => {
  // Elimina el token del almacenamiento local
  localStorage.removeItem('token');

  // Redirige al usuario a la página de inicio o login
  window.location.href = '/';
};

// Crear el router con las rutas y pasar handleLogout a Profile
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout1 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'iniciosesion',
        element: <Login />,
      },
      {
        path: 'registro',
        element: <Register />,
      },
      {
        path: 'perfil',
        element: <Profile onLogout={handleLogout} />, // Pasamos la función handleLogout como prop
      },
      {
        path: 'contacto',
        element: <ContactPage />,
      },
      {
        path: 'altaemprendedora',
        element: <RegisterSeller />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'productStore',
        element: <ProductStore />
      },
      {
        path: '/store',
        element: <Store />
      },
      {
        path: '/productManager',
        element: <ProductManager />
      },
      
     

    ],
  },
]);

export default router;
