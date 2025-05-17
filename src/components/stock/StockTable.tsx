import React from "react";
import { Stock } from "../../types/models";

interface Props {
  stocks: Stock[];
}

const StockTable = ({ stocks }: Props) => {
  
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-lg overflow-x-auto mt-8">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 px-4 pt-4">Current Stock per Center</h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-2">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Center</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Medicine</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Quantity</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {stocks.map((item) => (
            <tr key={item.id} className="hover:bg-gray-600">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {item.center_name.toLowerCase()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {item.medicine_name.toLowerCase()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                {item.total_quantity}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.last_updated).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {stocks.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-400 dark:text-gray-500">
                No stock records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
