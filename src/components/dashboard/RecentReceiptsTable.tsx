interface Receipt {
  center_name: string;
  medicine_name: string;
  unit: string;
  quantityReceived: number;
  receivedDate: string;
}

const RecentReceiptsTable: React.FC<{ receipts: Receipt[] }> = ({ receipts }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2">Réceptions Récentes</h3>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Centre</th>
            <th className="p-2">Médicament</th>
            <th className="p-2">Unité</th>
            <th className="p-2">Quantité</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{r.center_name}</td>
              <td className="p-2">{r.medicine_name}</td>
              <td className="p-2">{r.unit}</td>
              <td className="p-2">{r.quantityReceived}</td>
              <td className="p-2">{new Date(r.receivedDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentReceiptsTable;