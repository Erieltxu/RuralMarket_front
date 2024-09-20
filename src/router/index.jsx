import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import '../index.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
export default router;