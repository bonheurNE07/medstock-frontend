import React from "react";
import { Receipt } from "../../types/models";


const RecentReceiptsTable: React.FC<{ receipts: Receipt[] }> = ({ receipts }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        Réceptions Récentes
      </h3>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <th className="p-2">Centre</th>
            <th className="p-2">Médicament</th>
            <th className="p-2">Unité</th>
            <th className="p-2">Quantité</th>
            <th className="p-2">Date de Péremption</th>
            <th className="p-2">Date de Reception</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="p-2 text-gray-700 dark:text-gray-200">{r.center_name.toLowerCase()}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{r.medicine_name.toLowerCase()}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{r.unit.toLowerCase()}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{r.quantity__received}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{r.expiration_date}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{r.received__date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentReceiptsTable;
