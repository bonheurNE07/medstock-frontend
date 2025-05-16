import React, { useEffect, useState } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import { Center, Medicine, Stock, Receipt } from "../types/models";
import { fetchStocks, fetchCenters, fetchMedicines } from "../services/stockService";
import { fetchReceipts } from "../services/receiptService";

import Filters from "../components/stock/Filters";
import StockTable from "../components/stock/StockTable";
import ReceiptTable from "../components/stock/ReceiptTable";
import ReceiptChart from "../components/stock/ReceiptChart";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";

const StockOverviewPage = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [receipts, setReceipts] = useState([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [medicineSearch, setMedicineSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { data: dashboard, loading } = useDashboardData();

  const [stockPage, setStockPage] = useState(1);
  const [stockNext, setStockNext] = useState<number | null>(null);
  const [stockPrev, setStockPrev] = useState<number | null>(null);

  const [receiptPage, setReceiptPage] = useState(1);
  const [receiptNext, setReceiptNext] = useState<number | null>(null);
  const [receiptPrev, setReceiptPrev] = useState<number | null>(null);


  useEffect(() => {
    fetchCenters().then(res => setCenters(res));
    fetchMedicines().then(res => setMedicines(res.data));
  }, []);

  useEffect(() => {
    const stockParams: any = { page: stockPage };
    const receiptParams: any = { page: receiptPage };

    if (selectedCenter) {
      stockParams.center = selectedCenter;
      receiptParams.center = selectedCenter;
    }

    if (medicineSearch) {
      stockParams.medicine_name = medicineSearch;
      receiptParams.medicine_name = medicineSearch;
    }

    if (startDate) receiptParams.start_date = startDate;
    if (endDate) receiptParams.end_date = endDate;

    fetchStocks(stockParams).then(res => {
      setStocks(res.results);
      setStockNext(res.next ? stockPage + 1 : null);
      setStockPrev(stockPage > 1 ? stockPage - 1 : null);
    });

    fetchReceipts(receiptParams).then(res => {
      setReceipts(res.results);
      setReceiptNext(res.next ? receiptPage + 1 : null);
      setReceiptPrev(receiptPage > 1 ? receiptPage - 1 : null);
    });
  }, [
    selectedCenter,
    medicineSearch,
    startDate,
    endDate,
    stockPage,
    receiptPage,
  ]);


  return (
    <div className="p-6 space-y-8 dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">📦 Stock Overview</h1>

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

      <StockTable stocks={stocks} />
      <div className="flex justify-center gap-4">
        <button
          onClick={() => stockPrev && setStockPage(stockPrev)}
          disabled={!stockPrev}
          className="px-4 py-2 bg-gray-600 rounded text-white disabled:opacity-40"
        >
          Previous Stock
        </button>
        <button
          onClick={() => stockNext && setStockPage(stockNext)}
          disabled={!stockNext}
          className="px-4 py-2 bg-[#0699A2] rounded text-white disabled:opacity-40"
        >
          Next Stock
        </button>
      </div>

      {!loading && dashboard?.alerts?.lowStock?.length > 0 && (
        <LowStockAlerts alerts={dashboard.alerts.lowStock} />
      )}
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
        <ReceiptChart receipts={receipts} />
      </div>
    </div>
  );
};

export default StockOverviewPage;
