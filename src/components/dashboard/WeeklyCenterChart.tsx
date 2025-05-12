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
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

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
  const periods = [...new Set(data.map(item => item.period))];

  const medicines = [...new Set(data.map(item => item.medicine))];

  const datasets = medicines.map((medicine, idx) => {
    const colorPalette = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];
    return {
      label: medicine,
      data: periods.map(
        (period) =>
          data.find((item) => item.medicine === medicine && item.period === period)?.totalUsed || 0
      ),
      borderColor: colorPalette[idx % colorPalette.length],
      fill: false,
      tension: 0.4,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{`Consommation Hebdo - ${centerName}`}</h3>
      <Line
        data={{
          labels: periods,
          datasets,
        }}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
};

export default WeeklyCenterChart;
