import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("../component/Layout"));
const Home = lazy(() => import("../pages/Home"));
const Add = lazy(() => import("../pages/Add"));
const Edit = lazy(() => import("../pages/Edit"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const EditDashboard = lazy(() => import("../pages/dashboard/EditDashboard"));
const LayoutDashboard = lazy(()=> import("../pages/dashboard/LayoutDashboard"))
import { FinancialRecordProvider } from "../contexts/financial.context";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <FinancialRecordProvider>
            <Dashboard />
          </FinancialRecordProvider>
        ),
      },
      {
        path: "add",
        element: <Add />,
      },
      {
        path: "editdashboard/:id",
        element: (
          <FinancialRecordProvider>
            <EditDashboard />
          </FinancialRecordProvider>
        ),
      },
    ],
  },
]);
export default router;
