import MedicineReceiptForm from "../components/receipts/MedicineReceiptForm";
import ExcelUpload from "../components/receipts/ExcelUpload";

export default function StockInsertionPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-6xl mx-auto dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Ajouter des informations de stock
      </h1>

      {/* Medicine Receipt Form Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Formulaire de réception des médicaments
        </h2>
        <MedicineReceiptForm />
      </section>

      {/* Excel Upload Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Téléverser le fichier Excel des reçus de médicaments
        </h2>
        <ExcelUpload />
      </section>
    </div>
  );
}
