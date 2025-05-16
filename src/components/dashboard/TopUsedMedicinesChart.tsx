import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

interface TopMedicine {
  name: string;
  totalUsed: number;
  unit: string;
}

const TopUsedMedicinesChart: React.FC<{ data: TopMedicine[] }> = ({ data }) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const labels = data.map((item) => item.name);
  const usageData = data.map((item) => item.totalUsed);

  const colorPalette = [
    "rgba(59, 130, 246, 0.7)",   // blue-500
    "rgba(16, 185, 129, 0.7)",   // green-500
    "rgba(245, 158, 11, 0.7)",   // yellow-500
    "rgba(239, 68, 68, 0.7)",    // red-500
    "rgba(99, 102, 241, 0.7)",   // indigo-500
  ];

  const backgroundColors = usageData.map((_, i) => colorPalette[i % colorPalette.length]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Utilisation Totale",
        data: usageData,
        backgroundColor: backgroundColors,
        borderRadius: 6,
        maxBarThickness: 30,
      },
    ],
  };

  const tickColor = isDarkMode ? "#E5E7EB" : "#374151"; // gray-200 vs gray-800
  const gridColor = isDarkMode ? "#4B5563" : "#D1D5DB";  // gray-600 vs gray-300

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const medicine = data[context.dataIndex];
            return `${medicine.name}: ${medicine.totalUsed} ${medicine.unit}`;
          },
        },
      },
    },
    layout: {
      padding: { top: 10, bottom: 10 },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: tickColor,
          font: { size: 12 },
        },
        grid: {
          drawOnChartArea: true,
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: function (label: string | number) {
            const str = label.toString();
            return str.length > 20 ? str.slice(0, 20) + "…" : str;
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
        Top 5 Médicaments les Plus Utilisés
      </h3>
      <div className="min-w-[300px] md:min-w-full h-[300px] md:h-[400px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TopUsedMedicinesChart;
