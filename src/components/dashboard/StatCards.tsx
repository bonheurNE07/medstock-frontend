import React from "react";

interface StatCardsProps {
  totalReceived: number;
  totalUsed: number;
  totalRemaining: number;
  centersCount: number;
  lastReceiptDate: string | null;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalReceived,
  totalUsed,
  totalRemaining,
  centersCount,
  lastReceiptDate,
}) => {
  const nf = new Intl.NumberFormat();
  const stats = [
    {
      label: "Total Reçu",
      value: nf.format(totalReceived),
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Total Utilisé",
      value: nf.format(totalUsed),
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Stock Restant",
      value: nf.format(totalRemaining),
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      label: "Centres Médicaux",
      value: centersCount,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 shadow-md ${stat.color} flex flex-col items-center justify-center`}
          >
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
      {lastReceiptDate && (
        <div className="text-sm text-gray-600 mt-2 text-center">
          Dernière réception: <strong>{new Date(lastReceiptDate).toLocaleDateString()}</strong>
        </div>
      )}
    </div>
  );
};

export default StatCards;
