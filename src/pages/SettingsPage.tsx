import React, { useEffect, useState } from "react";
import CenterForm from "../components/settings/CenterForm";
import MedicineForm from "../components/settings/MedicineForm";
import CenterTable from "../components/settings/CenterTable";
import MedicineTable from "../components/settings/MedicineTable";
import { fetchCenters, fetchMedicines } from "../services/stockService";

export default function SettingsPage() {
  const [centers, setCenters] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const loadData = async () => {
    const [c, m] = await Promise.all([fetchCenters(), fetchMedicines()]);
    setCenters(c);
    setMedicines(m);
  };

  const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Ajouter un Centre Médical
        </h2>
        <CenterForm onCreated={loadData} />
        <CenterTable centers={centers} />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Ajouter un Médicament
        </h2>
        <MedicineForm onCreated={loadData} />
        <MedicineTable medicines={medicines} />
      </section>
    </div>
  );
}
