import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardApi";

import StatCards from "../components/dashboard/StatCards";
import WeeklyCenterChart from "../components/dashboard/WeeklyCenterChart";
import RecentReceiptsTable from "../components/dashboard/RecentReceiptsTable";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import TopUsedMedicinesChart from "../components/dashboard/TopUsedMedicinesChart";
import StockPerCenterTable from "../components/dashboard/StockPerCenterTable";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboard(data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4 space-y-6">
      <StatCards
      totalReceived={dashboard.summary.totalReceivedQuantity}
      totalUsed={dashboard.summary.totalMedicines}
      totalRemaining={dashboard.summary.totalStockQuantity}
      centersCount={dashboard.summary.totalCenters}
      lastReceiptDate={dashboard.summary.lastReceiptDate}
    />

      <LowStockAlerts alerts={dashboard.alerts.lowStock} />

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
