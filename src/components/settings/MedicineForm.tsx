import React, { useState } from "react";
import { createMedicine } from "../../services/stockService";

export default function MedicineForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !unit) return;
    setLoading(true);
    await createMedicine({ name, unit });
    setName("");
    setUnit("");
    setLoading(false);
    onCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row flex-wrap gap-3 bg-gray-800 p-4 rounded-lg"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom du Médicament"
        className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
      />
      <input
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="Unité (e.g., mg)"
        className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Ajout..." : "Ajouter Médicament"}
      </button>
    </form>
  );
}
