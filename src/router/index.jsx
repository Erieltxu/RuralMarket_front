import { createBrowserRouter } from "react-router-dom";
import Layout1 from "../layout/Layout";
import Home from "../pages/Home";
import '../index.css';
<<<<<<< HEAD
=======

>>>>>>> 8f256a7c3e8bd5fc239fe64bd93ee89b1d0b2c23
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout1 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
<<<<<<< HEAD
=======

>>>>>>> 8f256a7c3e8bd5fc239fe64bd93ee89b1d0b2c23
export default router;