import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import StockOverviewPage from "../pages/StockOverviewPage";
import StockInsertionPage from "../pages/StockInsertionPage";
import ReportInsertionPage from "../pages/ReportInsertionPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/stocks" element={<StockOverviewPage />} />
      <Route path="/receipts" element={<StockInsertionPage />} />
      <Route path="/reports" element={<ReportInsertionPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
