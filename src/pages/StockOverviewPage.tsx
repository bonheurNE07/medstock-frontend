  import React, { useEffect, useState } from "react";
  import { useDashboardData } from "../hooks/useDashboardData";
  import { Center, Stock } from "../types/models";
  import { fetchStocks, fetchCenters } from "../services/stockService";
  import { fetchReceipts } from "../services/receiptService";

  import Filters from "../components/stock/Filters";
  import StockTable from "../components/stock/StockTable";
  import LowStockAlerts from "../components/dashboard/LowStockAlerts";
  import StockChart from "../components/stock/StockChart";

  const StockOverviewPage = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [centers, setCenters] = useState<Center[]>([]);
    const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
    const [medicineSearch, setMedicineSearch] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const { data: dashboard, loading } = useDashboardData();

    const [stockPage, setStockPage] = useState(1);
    const [stockNext, setStockNext] = useState<number | null>(null);
    const [stockPrev, setStockPrev] = useState<number | null>(null);


    useEffect(() => {
      fetchCenters().then(res => setCenters(res));
    }, []);

    useEffect(() => {
      const stockParams: any = { page: stockPage };

      if (selectedCenter) {
        stockParams.center = selectedCenter;
      }

      if (medicineSearch) {
        stockParams.medicine_name = medicineSearch;
      }


      fetchStocks(stockParams).then(res => {
        setStocks(res.results);
        setStockNext(res.next ? stockPage + 1 : null);
        setStockPrev(stockPage > 1 ? stockPage - 1 : null);
      });

    }, [
      selectedCenter,
      medicineSearch,
      startDate,
      endDate,
      stockPage,
    ]);


    return (
      <div className="p-6 space-y-8 dark:bg-gray-800 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">📦 Vue d'ensemble du stock</h1>

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
        <div className="mt-8">
          <StockChart title={"📦 Graphique du stock"} stocks={stocks} />
        </div>
      </div>
    );
  };

  export default StockOverviewPage;
