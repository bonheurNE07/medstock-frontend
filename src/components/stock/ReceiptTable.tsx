import React from "react";

export interface Receipt {
  id: number;
  center: number;
  center_name: string;
  medicine: number;
  medicine_name: string;
  unit: string;
  quantity_received: number;
  exp_date: string;
  received_date: string;
}

interface Props {
  receipts: Receipt[];
}

const ReceiptTable = ({ receipts }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-lg overflow-x-auto mt-8">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 px-4 pt-4">Médicaments reçu</h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-2">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Centre</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Médicament</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Quantité reçue</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Date de péremption</th>
            <th className="text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200">Date de reception</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {receipts.map((item) => (
            <tr key={item.id} className="hover:bg-gray-600">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {item.center_name.toLowerCase()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {item.medicine_name.toLowerCase()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-blue-600 dark:text-blue-400">
                {item.quantity_received}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {item.exp_date}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {item.received_date}
              </td>
            </tr>
          ))}
          {receipts.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-400 dark:text-gray-500 ">
                No receipts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptTable;
