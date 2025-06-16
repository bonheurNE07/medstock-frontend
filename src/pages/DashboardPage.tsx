import { useDashboardData } from "../hooks/useDashboardData";

import StatCards from "../components/dashboard/StatCards";
import WeeklyCenterChart from "../components/dashboard/WeeklyCenterChart";
import RecentReceiptsTable from "../components/dashboard/RecentReceiptsTable";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import TopUsedMedicinesChart from "../components/dashboard/TopUsedMedicinesChart";
import StockPerCenterTable from "../components/dashboard/StockPerCenterTable";
import WeeklyReportExportButton from "../components/reports/WeeklyReportExportButton";

const DashboardPage = () => {
  const { data: dashboard, loading } = useDashboardData();

  if (loading) return <div className="p-4 text-gray-700 dark:text-gray-200">Chargement...</div>;
  if (!dashboard) return <div className="p-4 text-red-600 dark:text-red-400">Erreur lors du chargement du tableau de bord.</div>;

  return (
    <div className="p-4 space-y-6 text-gray-800 dark:text-gray-100">
      <StatCards
        totalReceived={dashboard.summary.totalReceivedQuantity ?? 0}
        totalMedicines={dashboard.summary.totalMedicines}
        totalRemaining={dashboard.summary.totalStockQuantity}
        centersCount={dashboard.summary.totalCenters}
        lastReceiptDate={dashboard.summary.lastReceiptDate}
      />

      {/* Export Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Exporter le Rapport Hebdomadaire
        </h2>
        <WeeklyReportExportButton />
      </section>

      {/* Alerts */}
      <LowStockAlerts alerts={dashboard.alerts.lowStock} />

      {/* Charts and Tables */}
      <TopUsedMedicinesChart data={dashboard.charts.topUsedMedicines} />
      <StockPerCenterTable data={dashboard.tables.stockPerCenter} />

      {Object.entries(dashboard.charts.weeklyConsumptionByCenter as Record<string, any[]>).map(
        ([centerName, entries]) => (
          <WeeklyCenterChart
            key={centerName}
            centerName={centerName}
            data={entries}
          />
        )
      )}

      <RecentReceiptsTable receipts={dashboard.tables.recentReceipts} />
    </div>
  );
};

export default DashboardPage;
