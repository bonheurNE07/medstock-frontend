import React, { useState } from "react";
import API from "../../services/api";

export default function WeeklyReportExportButton() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (startDate) params.start = startDate;
      if (endDate) params.end = endDate;

      const response = await API.get("/reports/export/", {
        params,
        responseType: "blob", // Important for file download
      });

      // Create a blob and simulate download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from Content-Disposition header
      const disposition = response.headers["content-disposition"];
      const fileNameMatch = disposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch?.[1] || "weekly_report.xlsx";

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed", error);
      alert("Erreur lors du téléchargement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
      <div className="flex flex-col gap-2 lg:gap-8 lg:flex-row lg:items-center ">
        <div className="flex flex-col flex-1">
          <h3 className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Date de début</h3>
          <input
            type="date"
            className="border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Date de fin</h3>
          <input
            type="date"
            className="border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-row lg:mt-6">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? "Téléchargement..." : "Télécharger le rapport"}
          </button>
        </div>
      </div>
    </div>
  );
}