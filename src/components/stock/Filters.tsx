import React from "react";
import { Center } from "../../types/models";

interface Props {
  centers: Center[];
  selectedCenter: number | null;
  onCenterChange: (centerId: number | null) => void;
  medicineSearch: string;
  onMedicineSearchChange: (val: string) => void;
  startDate: string;
  onStartDateChange: (val: string) => void;
  endDate: string;
  onEndDateChange: (val: string) => void;
}

const Filters = ({
  centers,
  selectedCenter,
  onCenterChange,
  medicineSearch,
  onMedicineSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: Props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Selectionner un centre</h3>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={selectedCenter ?? ""}
          onChange={(e) => onCenterChange(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Tous les centres</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col gap-2 ">
        <h3 className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Rechercher un médicament</h3>
        <input
          type="text"
          placeholder="Rechercher un médicament"
          value={medicineSearch}
          onChange={(e) => onMedicineSearchChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <h3 className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Date de début</h3>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div className="flex flex-col gap-2 ">
        <h3 className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Date de fin</h3>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

export default Filters;
