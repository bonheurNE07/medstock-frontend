import React from "react";

interface Props {
  centers: { id: number; name: string }[];
}

export default function CenterTable({ centers }: Props) {
  return (
    <div className="mt-4 border rounded-lg overflow-y-auto max-h-64 bg-gray-800">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nom</th>
          </tr>
        </thead>
        <tbody>
          {centers.map((center) => (
            <tr key={center.id} className="border-t border-gray-600 hover:bg-gray-600">
              <td className="px-4 py-2">{center.id}</td>
              <td className="px-4 py-2">{center.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
