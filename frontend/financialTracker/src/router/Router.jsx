import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("../component/Layout"));
const Home = lazy(() => import("../pages/Home"));
const Add = lazy(() => import("../pages/Add"));
const Edit = lazy(() => import("../pages/Edit"));
const Dashboard = lazy(() => import("../pages/deshborad/Dashboard"));
import { FinancialRecordProvider } from "../contexts/financial.context";

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
        path: "dashboard",
        element: 
          <FinancialRecordProvider>
            <Dashboard />
          </FinancialRecordProvider>
        ,
      },
      {
        path: "add",
        element: <Add />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
    ],
  },
]);
export default router;
