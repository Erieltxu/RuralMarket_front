import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
import Product from "../components/Product";


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
        path: '/product',
        element: <Product></Product>
    },
    ],
  },
]);

export default router;