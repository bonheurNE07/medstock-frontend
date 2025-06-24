import React from "react";

interface Props {
  medicines: { id: number; name: string; unit: string }[];
}

export default function MedicineTable({ medicines }: Props) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-100">
          <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Nom</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Unité</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {medicines.map((med, index) => (
              <tr
                key={med.id}
                className={`border-t dark:border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                <td className="px-4 py-2">{med.id}</td>
                <td className="px-4 py-2">{med.name.toLowerCase()}</td>
                <td className="px-4 py-2">{med.unit.toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
