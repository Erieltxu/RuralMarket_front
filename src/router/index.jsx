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
import WhoWeAre from "../pages/WhoWeAre";
import ProductList from "../components/createProduct/ProductList";
import PasswordReset from '../pages/password/PasswordReset';
import PasswordResetComplete from '../pages/password/PasswordResetComplete';
import PasswordResetConfirm from '../pages/password/PasswordResetConfirm';
import PasswordResetDone from '../pages/password/PasswordResetDone';
import EntrepreneursView from '../pages/EntrepreneursView';
import PrivacyPolicy from '../components/PrivacyPolicy';
import CartPage from "../pages/CartPage";
import Store from "../pages/Store";
import CreateProductForm  from '../components/createProduct/CreateProductForm'
import ProductDetails  from '../components/createProduct/ProductDetails'
import Order from '../components/cart/Order';
import OrderSeller from "../components/OrderSeller";
import Confirmation from '../components/cart/Confirmation';

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
        element: <CreateProductForm />,
      },
      {
        path: 'productlist',
        element: <ProductList />,
      },
      {
        path: 'uploadProduct',
        element: <UploadProduct />
      },
      {
        path: 'quienessomos',
        element: <WhoWeAre />
      },
      {
        path: 'password_reset',
        element: <PasswordReset />
      },
      {
        path: 'password_reset/done',
        element: <PasswordResetDone />
      },
      {
        path: 'reset/:uid/:token',
        element: <PasswordResetConfirm />
      },
      {
        path: 'reset/done',
        element: <PasswordResetComplete />
      },
      {
        path: 'nuestrasemprendedoras',
        element: <EntrepreneursView />
      },
      {
        path: 'nuestrasemprendedoras/:id',
        element: <EntrepreneursView />
      },
      {
        path: '/politica_privacidad',
        element: <PrivacyPolicy />
      },
      {
        path: 'carrito',
        element: <CartPage />
      },
      {
        path: '/Store',
        element: <Store />
      },
      
      {
        path: 'product/:id', 
        element: <ProductDetails />, 
      },
      {
        path: '/Recibo',
        element: <Order />
      },
      {
        path: 'pedidos', 
        element: <OrderSeller />
      },
      {
        path: 'confirmation', 
        element: <Confirmation />,
      },
    ],
  },
]);

export default router;
