import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layouts/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Confirmation from "../pages/Confirmation";
import SetPassword from "../pages/SetPassword";
import StockOverviewPage from "../pages/StockOverviewPage";
import StockInsertionPage from "../pages/StockInsertionPage";
import ReportInsertionPage from "../pages/ReportInsertionPage";
import SettingsPage from "../pages/SettingsPage";
import PrivateRoute from "../routers/PrivateRoute";


export default function AppRoutes() {
  const Home = React.lazy(() => import('../pages/DashboardPage'));
  const NotFound = React.lazy(() => import('../pages/NotFound')); 
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }/>

          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="confirmation" element={<Confirmation />}/>
          <Route path="setpassword" element={<SetPassword />}/>

          <Route path="/stocks" element={
            <PrivateRoute>
              <StockOverviewPage />
            </PrivateRoute>
          } />
          <Route path="/receipts" element={
            <PrivateRoute>
              <StockInsertionPage />
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <ReportInsertionPage />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          } />
        </Route>

        {/* Catch all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}
