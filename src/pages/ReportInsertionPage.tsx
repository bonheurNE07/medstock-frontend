import React from "react";
import WeeklyReportForm from "../components/reports/WeeklyReportForm";
import WeeklyReportExcelUpload from "../components/reports/WeeklyReportExcelUpload";
import WeeklyReportExportButton from "../components/reports/WeeklyReportExportButton";

export default function ReportInsertionPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-6xl mx-auto bg-gray-900 text-gray-200">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-100">
        Ajouter un Rapport Hebdomadaire
      </h1>

      <section className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Exporter le Rapport Hebdomadaire
        </h2>
        <WeeklyReportExportButton />
      </section>

      {/* Formulaire manuel */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">Formulaire de Saisie</h2>
        <WeeklyReportForm />
      </section>

      {/* Importation Excel */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">Importer un Fichier Excel</h2>
        <WeeklyReportExcelUpload />
      </section>
    </div>
  );
}
