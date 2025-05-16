import React, { useState } from 'react';
import { uploadWeeklyReportExcel } from '../../services/reportService';

const WeeklyReportExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ row: number; error: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (
      selected.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      selected.type === 'application/vnd.ms-excel'
    ) {
      setFile(selected);
      setMessage('');
      setErrors([]);
    } else {
      setFile(null);
      setMessage('❌ Please upload a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('❌ No file selected');
      return;
    }

    try {
      setUploading(true);
      setMessage('');
      setErrors([]);

      const result = await uploadWeeklyReportExcel(file);
      setMessage(`✅ Successfully inserted ${result.inserted} reports`);

      if (result.errors?.length > 0) {
        setErrors(result.errors);
      }

      setFile(null);
    } catch (error: any) {
      const detail =
        error?.response?.data?.error || '❌ Upload failed. Please try again.';
      setMessage(detail);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-sm border p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="weekly-report-upload"
          className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-300"
              fill="none"
              viewBox="0 0 20 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Excel files (.xlsx or .xls)</p>
          </div>
          <input
            id="weekly-report-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[75%]">{file.name}</span>
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm disabled:bg-blue-400"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}

      {message && (
        <p
          className={`mt-4 text-sm ${
            message.startsWith('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {message}
        </p>
      )}

      {errors.length > 0 && (
        <div className="mt-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm rounded p-4 max-h-48 overflow-y-auto">
          <p className="font-semibold mb-2">Some rows failed to upload:</p>
          <ul className="list-disc ml-5 space-y-1">
            {errors.map((err, idx) => (
              <li key={idx}>
                Row {err.row}: {err.error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeeklyReportExcelUpload;
