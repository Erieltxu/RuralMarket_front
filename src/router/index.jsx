import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
import Login from "../pages/Login";
import Product from "../pages/Product";
import UploadProduct from "../components/UploadProduct";
import Entrepreneurs from "../pages/Entrepreneurs";
import ProductList from "../components/createProduct/ProductList";

<<<<<<< HEAD

=======

const handleLogout = () => {
 
  localStorage.removeItem('token');


  window.location.href = '/';
};


>>>>>>> f463d55 (DONE: deleted comments  TODO call back)
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
        element: <Product />,
      },
      {
        path: 'productlist',
        element: <ProductList/>,
      },
      {
        path: 'productlist',
        element: <ProductList/>,
      },
      {
        path: 'uploadProduct',
        element: <UploadProduct />
      },
    ],
  },
]);

export default router;
