import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ContactPage from "../pages/ContactPage";
import RegisterSeller from "../pages/RegisterSeller";
import UploadProduct from "../components/Store/ProductStore"
import Product from "../components/createProduct/ProductList"
import Entrepreneurs from "../pages/Entrepreneurs";


const handleLogout = () => {
 
  localStorage.removeItem('token');


  window.location.href = '/';
};


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
        element: <Profile onLogout={handleLogout} />, 
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
        element: <Product/>,
      },
      {
        path: 'uploadProduct',
        element: <UploadProduct />
      },
      {
        path: 'quienessomos',
        element: <Entrepreneurs />
      },
    ],
  },
]);

export default router;
