import React from "react";
import WeeklyReportForm from "../components/reports/WeeklyReportForm";
import WeeklyReportExcelUpload from "../components/reports/WeeklyReportExcelUpload";
import WeeklyReportExportButton from "../components/reports/WeeklyReportExportButton";

export default function ReportInsertionPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-10 max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Ajouter un Rapport Hebdomadaire
      </h1>

      {/* Export Section */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold">Exporter le Rapport Hebdomadaire</h2>
        <WeeklyReportExportButton />
      </section>

      {/* Manual Form Section */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold">Formulaire de Saisie</h2>
        <WeeklyReportForm />
      </section>

      {/* Excel Upload Section */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold">Importer un Fichier Excel</h2>
        <WeeklyReportExcelUpload />
      </section>
    </div>
  );
}
