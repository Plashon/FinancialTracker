import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("../component/Layout"));
const Home = lazy(() => import("../pages/Home"));
const Add = lazy(() => import("../pages/Add"));
const Edit = lazy(() => import("../pages/Edit"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "add",
        element: <Add />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
   
  },
]);
export default router;
