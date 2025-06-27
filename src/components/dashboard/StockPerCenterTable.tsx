import React from "react";

interface StockEntry {
  center_name: string;
  medicine_name: string;
  available_stock: number;
  unit: string;
}

const StockPerCenterTable: React.FC<{ data: StockEntry[] }> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-[#181818]/40 rounded-xl shadow p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Stock Disponible par Centre
      </h3>
      <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <th className="p-2">Centre</th>
            <th className="p-2">Médicament</th>
            <th className="p-2">Quantité</th>
            <th className="p-2">Unité</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="p-1 capitalize text-xs">{entry.center_name}</td>
              <td className="p-1 capitalize text-xs">{entry.medicine_name}</td>
              <td className="p-1 text-xs">{entry.available_stock}</td>
              <td className="p-1 capitalize text-xs">{entry.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockPerCenterTable;
