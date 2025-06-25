import React, { useEffect, useState } from "react";

import MedicineReceiptForm from "../components/receipts/MedicineReceiptForm";
import ExcelUpload from "../components/receipts/ExcelUpload";
import ReceiptTable from "../components/stock/ReceiptTable";
import Filters from "../components/stock/Filters";
import ReceiptChart from "../components/receipts/ReceiptChart";

import { Center } from "../types/models";

import { fetchReceipts } from "../services/receiptService";
import { fetchCenters } from "../services/stockService";

export default function StockInsertionPage() {
  const [receipts, setReceipts] = useState([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [medicineSearch, setMedicineSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [receiptPage, setReceiptPage] = useState(1);
  const [receiptNext, setReceiptNext] = useState<number | null>(null);
  const [receiptPrev, setReceiptPrev] = useState<number | null>(null);

  useEffect(() => {
      fetchCenters().then(res => setCenters(res));
    }, []);
  
  useEffect(() => {
    const receiptParams: any = { page: receiptPage };

    if (selectedCenter) {
      receiptParams.center = selectedCenter;
    }

    if (medicineSearch) {
      receiptParams.medicine_name = medicineSearch;
    }

    if (startDate) receiptParams.start_date = startDate;
    if (endDate) receiptParams.end_date = endDate;

    fetchReceipts(receiptParams).then(res => {
      setReceipts(res.results);
      setReceiptNext(res.next ? receiptPage + 1 : null);
      setReceiptPrev(receiptPage > 1 ? receiptPage - 1 : null);
    });
  }, [
    selectedCenter,
    medicineSearch,
    receiptPage,
    startDate,
    endDate,
  ]);
  

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-6xl mx-auto dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Ajouter des informations de stock
      </h1>

      {/* Medicine Receipt Form Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Formulaire de réception des médicaments
        </h2>
        <MedicineReceiptForm />
      </section>

      {/* Excel Upload Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Téléverser le fichier Excel des reçus de médicaments
        </h2>
        <ExcelUpload />
      </section>

      {/* Display Section */}
      {/* Separator */}
      <hr className="my-6 border-gray-300 dark:border-gray-600" />
      
      <Filters
        centers={centers}
        selectedCenter={selectedCenter}
        onCenterChange={setSelectedCenter}
        medicineSearch={medicineSearch}
        onMedicineSearchChange={setMedicineSearch}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />

      <ReceiptTable receipts={receipts} />
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => receiptPrev && setReceiptPage(receiptPrev)}
          disabled={!receiptPrev}
          className="px-4 py-2 bg-gray-600 rounded text-white disabled:opacity-40"
        >
          Previous Receipt
        </button>
        <button
          onClick={() => receiptNext && setReceiptPage(receiptNext)}
          disabled={!receiptNext}
          className="px-4 py-2 bg-[#0699A2] rounded text-white disabled:opacity-40"
        >
          Next Receipt
        </button>
      </div>
      <div className="mt-8">
      <ReceiptChart title={"📊 Graphique des réceptions"} receipts={receipts} />
      </div>
    </div>
  );
}
