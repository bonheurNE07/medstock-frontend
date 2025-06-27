import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Title);

interface ChartEntry {
  medicine: string;
  unit: string;
  totalUsed: number;
  period: string;
}

interface WeeklyCenterChartProps {
  centerName: string;
  data: ChartEntry[];
}

const WeeklyCenterChart: React.FC<WeeklyCenterChartProps> = ({ centerName, data }) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const periods = [...new Set(data.map((item) => item.period))];
  const medicines = [...new Set(data.map((item) => item.medicine))];

  const colorPalette = [
    "#3B82F6", // blue-500
    "#10B981", // green-500
    "#F59E0B", // yellow-500
    "#EF4444", // red-500
    "#6366F1", // indigo-500
    "#8B5CF6", // purple-500
    "#06B6D4", // cyan-500
  ];

  const datasets = medicines.map((medicine, idx) => ({
    label: medicine,
    data: periods.map(
      (period) =>
        data.find((item) => item.medicine === medicine && item.period === period)?.totalUsed || 0
    ),
    borderColor: colorPalette[idx % colorPalette.length],
    backgroundColor: colorPalette[idx % colorPalette.length],
    fill: false,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 5,
  }));

  const tickColor = isDarkMode ? "#E5E7EB" : "#374151"; // gray-200 vs gray-800
  const gridColor = isDarkMode ? "#4B5563" : "#D1D5DB";  // gray-600 vs gray-300

  return (
    <div className="bg-white dark:bg-[#181818]/40 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 whitespace-nowrap">
        {`Consommation Hebdo - ${centerName}`}
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px] sm:min-w-[700px] md:min-w-[900px] lg:min-w-[1100px] h-[200px] md:h-[300px]">
          <Line
            data={{ labels: periods, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    boxWidth: 10,
                    font: { size: 10 },
                    color: tickColor,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context: any) {
                      const value = context.raw;
                      const label = context.dataset.label;
                      return `${label}: ${value}`;
                    },
                  },
                },
              },
              layout: {
                padding: { top: 5, bottom: 5 },
              },
              scales: {
                x: {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 15,
                    maxRotation: 0,
                    minRotation: 0,
                    color: tickColor,
                    font: (context) => {
                      const labelCount = context.chart.data.labels?.length || 1;
                      if (labelCount < 6) return { size: 14 };
                      if (labelCount < 10) return { size: 12 };
                      if (labelCount < 20) return { size: 10 };
                      return { size: 8 };
                    },
                  },
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: tickColor,
                    font: { size: 12 },
                  },
                  grid: {
                    color: gridColor,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyCenterChart;
