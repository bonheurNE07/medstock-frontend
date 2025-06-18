import React, { useState } from "react";
import { createCenter } from "../../services/stockService";

export default function CenterForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await createCenter({ name });
    setName("");
    setLoading(false);
    onCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-gray-800 p-4 rounded-lg"
    >
      <h3 className="sm:p-1 text-base text-gray-800 dark:text-gray-100 mb-2">Nom du Centre</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom du Centre"
        className="px-4 py-2 border border-gray-600 rounded-lg w-full sm:w-auto bg-gray-700 text-gray-200"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Ajout..." : "Ajouter Le Centre"}
      </button>
    </form>
  );
}
