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
      lightBg: "bg-blue-100",
      lightText: "text-blue-800",
      darkBg: "dark:bg-blue-900",
      darkText: "dark:text-blue-200",
    },
    {
      label: "Total Medicaments",
      value: nf.format(totalMedicines),
      lightBg: "bg-green-100",
      lightText: "text-green-800",
      darkBg: "dark:bg-green-900",
      darkText: "dark:text-green-200",
    },
    {
      label: "Stock Restant",
      value: nf.format(totalRemaining),
      lightBg: "bg-yellow-100",
      lightText: "text-yellow-800",
      darkBg: "dark:bg-yellow-900",
      darkText: "dark:text-yellow-200",
    },
    {
      label: "Centres Médicaux",
      value: centersCount,
      lightBg: "bg-purple-100",
      lightText: "text-purple-800",
      darkBg: "dark:bg-purple-900",
      darkText: "dark:text-purple-200",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 shadow-md flex flex-col items-center justify-center
              ${stat.lightBg} ${stat.lightText}
              ${stat.darkBg} ${stat.darkText}`}
          >
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
      {lastReceiptDate && (
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
          Dernière réception: <strong>{new Date(lastReceiptDate).toLocaleDateString()}</strong>
        </div>
      )}
    </div>
  );
};

export default StatCards;
