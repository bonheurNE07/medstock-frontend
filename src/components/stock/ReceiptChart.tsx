import React, { useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  PointElement
} from "chart.js";
import { Receipt } from "./ReceiptTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

interface Props {
  receipts: Receipt[];
}

type ChartGroupBy = "medicine" | "date";

const generateColors = (count: number) => {
  const palette = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1",
    "#EC4899", "#14B8A6", "#8B5CF6", "#22C55E", "#F472B6"
  ];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
};

const ReceiptChart = ({ receipts }: Props) => {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [groupBy, setGroupBy] = useState<ChartGroupBy>("medicine");

  const chartData = useMemo(() => {
    const map: Record<string, number> = {};

    receipts.forEach((r) => {
      const key = groupBy === "medicine"
        ? r.medicine_name || "Unknown"
        : r.received_date || "Unknown";
      map[key] = (map[key] || 0) + r.quantity_received;
    });

    const labels = Object.keys(map).sort(); // sort by name or date
    const values = labels.map((label) => map[label]);
    const colors = generateColors(labels.length);

    return {
      labels,
      datasets: [
        {
          label: groupBy === "medicine"
            ? "Total Quantity per Medicine"
            : "Total Quantity per Date",
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
  }, [receipts, groupBy]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `📈 Grouped by ${groupBy === "medicine" ? "Medicine" : "Date"}`
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-lg p-4 mt-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">📊 Receipt Chart</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setGroupBy("medicine")}
            className={`px-3 py-1 rounded ${groupBy === "medicine" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white"}`}
          >
            Group by Medicine
          </button>
          <button
            onClick={() => setGroupBy("date")}
            className={`px-3 py-1 rounded ${groupBy === "date" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white"}`}
          >
            Group by Date
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded ${chartType === "bar" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white"}`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded ${chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white"}`}
          >
            Line
          </button>
        </div>
      </div>

      {chartType === "bar" ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ReceiptChart;
