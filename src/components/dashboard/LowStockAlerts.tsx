import React from "react";
import { AlertCircle } from "lucide-react";

interface LowStockEntry {
  medicine_name: string;
  center_name: string;
  available_stock: number;
  unit: string;
}

const LowStockAlerts: React.FC<{ alerts: LowStockEntry[] }> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-300">
        Alertes de Stock Faible
      </h3>
      <ul className="space-y-2">
        {alerts.map((alert, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400"
          >
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-300" />
            {alert.medicine_name} à {alert.center_name} —{" "}
            {alert.available_stock} {alert.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockAlerts;
