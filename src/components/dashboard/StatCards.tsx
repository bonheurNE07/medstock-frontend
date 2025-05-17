import React from "react";

interface StatCardsProps {
  totalReceived: number;
  totalMedicines: number;
  totalRemaining: number;
  centersCount: number;
  lastReceiptDate: string | null;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalReceived,
  totalMedicines,
  totalRemaining,
  centersCount,
  lastReceiptDate,
}) => {
  const nf = new Intl.NumberFormat();

  const stats = [
    {
      label: "Total Reçu",
      value: nf.format(totalReceived),
      bg: "bg-blue-500/20 backdrop-blur",
      text: "text-blue-800 dark:text-blue-200",
    },
    {
      label: "Total Médicaments",
      value: nf.format(totalMedicines),
      bg: "bg-emerald-500/20 backdrop-blur",
      text: "text-emerald-800 dark:text-emerald-200",
    },
    {
      label: "Stock Restant",
      value: nf.format(totalRemaining),
      bg: "bg-yellow-400/20 backdrop-blur",
      text: "text-yellow-800 dark:text-yellow-100",
    },
    {
      label: "Centres Médicaux",
      value: centersCount,
      bg: "bg-fuchsia-400/20 backdrop-blur",
      text: "text-fuchsia-800 dark:text-fuchsia-200",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 shadow-md ${stat.bg} ${stat.text} hover:scale-105 transition-all duration-300`}
          >
            <div className="text-2xl font-extrabold mb-1">{stat.value}</div>
            <div className="text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {lastReceiptDate && (
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-4 text-center">
          Dernière réception :{" "}
          <strong>{new Date(lastReceiptDate).toLocaleDateString()}</strong>
        </div>
      )}
    </div>
  );
};

export default StatCards;
