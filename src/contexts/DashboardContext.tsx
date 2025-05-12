// src/contexts/DashboardContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardApi";

type DashboardStats = {
  total_centers: number;
  total_medicines: number;
  total_stock: number;
  total_consumed: number;
  top_consumed: { medicine: string; quantity_used: number }[];
  center_stock_levels: { center: string; total_quantity: number }[];
};

const DashboardContext = createContext<DashboardStats | null>(null);

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardData();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      }
    };
    loadStats();
  }, []);

  return (
    <DashboardContext.Provider value={stats}>
      {children}
    </DashboardContext.Provider>
  );
};
