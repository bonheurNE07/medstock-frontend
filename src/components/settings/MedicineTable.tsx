import React from "react";

interface Props {
  medicines: { id: number; name: string; unit: string }[];
}

export default function MedicineTable({ medicines }: Props) {
  return (
    <div className="mt-4 border rounded-lg overflow-y-auto max-h-64 bg-gray-800">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Unité</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr
              key={med.id}
              className="border-t border-gray-600 hover:bg-gray-600"
            >
              <td className="px-4 py-2">{med.id}</td>
              <td className="px-4 py-2">{med.name}</td>
              <td className="px-4 py-2">{med.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
