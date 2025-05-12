import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}