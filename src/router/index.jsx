import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
import Login from "../pages/Login";
import Product from "../pages/Product";
import UploadProduct from "../components/UploadProduct";
import Entrepreneurs from "../pages/Entrepreneurs";


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
        path: 'login',
        element: <Login />,
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
        path: 'entrepreneurs',
        element: <Entrepreneurs />
      },
    ],
  },
]);
export default router;