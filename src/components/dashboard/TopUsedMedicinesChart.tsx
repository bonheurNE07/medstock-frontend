import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TopMedicine {
  name: string;
  totalUsed: number;
  unit: string;
}

const TopUsedMedicinesChart: React.FC<{ data: TopMedicine[] }> = ({ data }) => {
  const labels = data.map((item) => item.name);
  const usageData = data.map((item) => item.totalUsed);

  // Tailwind-inspired color palette
  const colorPalette = [
    "rgba(59, 130, 246, 0.7)",  // blue-500
    "rgba(16, 185, 129, 0.7)",  // green-500
    "rgba(245, 158, 11, 0.7)",  // yellow-500
    "rgba(239, 68, 68, 0.7)",   // red-500
    "rgba(99, 102, 241, 0.7)",  // indigo-500
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
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Top 5 Médicaments les Plus Utilisés</h3>
      <Bar
        data={chartData}
        options={{
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const medicine = data[context.dataIndex];
                  return `${medicine.name}: ${medicine.totalUsed} ${medicine.unit}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TopUsedMedicinesChart;
