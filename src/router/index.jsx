import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
import Login from "../pages/Login";
<<<<<<< HEAD
import Product from "../pages/Product";
import UploadProduct from "../components/UploadProduct";
=======
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ContactPage from "../pages/ContactPage";
import RegisterSeller from "../pages/RegisterSeller";

import Product from "../components/createProduct/ProductList"
>>>>>>> b2055af (DONE: add button category TODO :post products)
import Entrepreneurs from "../pages/Entrepreneurs";
import ProductList from "../components/createProduct/ProductList";
<<<<<<< HEAD

<<<<<<< HEAD

=======
=======
import PasswordReset from '../pages/password/PasswordReset';
import PasswordResetComplete from '../pages/password/PasswordResetComplete';
import PasswordResetConfirm from '../pages/password/PasswordResetConfirm';
import PasswordResetDone from '../pages/password/PasswordResetDone';
>>>>>>> 13dbe14 (DONE styles modified. TODO small changes)

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
        path: 'productStore',
        element: <ProductStore />
      },
<<<<<<< HEAD
=======
      {
        path: '/store',
        element: <Store />
      },
      {
        path: '/productManager',
        element: <ProductManager />
      },
>>>>>>> 13dbe14 (DONE styles modified. TODO small changes)
    ],
  },
]);

export default router;
