import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCenters, fetchMedicines } from '../../services/stockService';
import { createWeeklyReport } from '../../services/reportService';
import { Center, Medicine } from '../../types';

interface FormData {
  center: string;
  medicine: string;
  week_start: string;
  week_end: string;
  quantity_used: string;
}

const WeeklyReportForm: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      week_start: '',
      week_end: '',
    },
  });

  useEffect(() => {
    fetchCenters().then(setCenters);
    fetchMedicines().then(setMedicines);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage('');
    try {
      await createWeeklyReport({
        center: parseInt(data.center),
        medicine: parseInt(data.medicine),
        week_start: data.week_start,
        week_end: data.week_end,
        quantity_used: parseInt(data.quantity_used),
      });
      setMessage('✅ Rapport hebdomadaire enregistré avec succès.');
      resetField('quantity_used');
    } catch (err) {
      console.error(err);
      setMessage('❌ Erreur lors de l’enregistrement du rapport.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        Formulaire de rapport hebdomadaire
      </h3>

      {/* Centre médical */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Centre médical
        </label>
        <select
          {...register('center', { required: 'Centre requis' })}
          className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="">-- Choisir un centre --</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
        {errors.center && (
          <p className="text-red-600 text-sm mt-1">{errors.center.message}</p>
        )}
      </div>

      {/* Médicament */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Médicament
        </label>
        <select
          {...register('medicine', { required: 'Médicament requis' })}
          className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="">-- Choisir un médicament --</option>
          {medicines.map((med) => (
            <option key={med.id} value={med.id}>
              {med.name}
            </option>
          ))}
        </select>
        {errors.medicine && (
          <p className="text-red-600 text-sm mt-1">{errors.medicine.message}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date de début de semaine
          </label>
          <input
            type="date"
            {...register('week_start', { required: 'Date de début requise' })}
            className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.week_start && (
            <p className="text-red-600 text-sm mt-1">{errors.week_start.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date de fin de semaine
          </label>
          <input
            type="date"
            {...register('week_end', { required: 'Date de fin requise' })}
            className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.week_end && (
            <p className="text-red-600 text-sm mt-1">{errors.week_end.message}</p>
          )}
        </div>
      </div>

      {/* Quantité */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Quantité utilisée
        </label>
        <input
          type="number"
          min={1}
          {...register('quantity_used', {
            required: 'Quantité requise',
            min: { value: 1, message: 'Minimum: 1' },
          })}
          className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {errors.quantity_used && (
          <p className="text-red-600 text-sm mt-1">
            {errors.quantity_used.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Enregistrement...
            </span>
          ) : (
            'Enregistrer'
          )}
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 font-medium">
          {message}
        </p>
      )}
    </form>
  );
};

export default WeeklyReportForm;
