import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
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

type OptionType = { value: number; label: string };

const WeeklyReportForm: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    resetField,
    control,
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
      resetField('medicine');
      resetField('week_start');
      resetField('week_end');
      resetField('quantity_used');
    } catch (err) {
      console.error(err);
      setMessage('❌ Erreur lors de l’enregistrement du rapport.');
    } finally {
      setLoading(false);
    }
  };

  const medicineOptions = medicines.map((med) => ({
    value: med.id,
    label: med.name,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-4 sm:p-6 md:p-8 space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        Formulaire de rapport hebdomadaire
      </h3>

      {/* Center Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Centre médical
        </label>
        <select
          {...register('center', { required: 'Centre requis' })}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
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

      {/* Medicine Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Médicament
        </label>
        <Controller
          name="medicine"
          control={control}
          rules={{ required: 'Médicament requis' }}
          render={({ field }) => (
            <Select<OptionType>
              options={medicineOptions}
              isSearchable
              placeholder="-- Choisir un médicament --"
              onChange={(selected) => field.onChange(selected?.value)}
              value={medicineOptions.find(
                (option) => option.value === Number(field.value)
              )}
              className="dark:bg-gray-700 dark:text-white"
              styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: '#1F2937', // Dark mode background color
                        color: '#D1D5DB', // Light text color for dark mode
                        borderColor: '#4B5563', // Border color in dark mode
                        minHeight: '2.5rem', // Ensures height matches other form controls
                        }),
                        singleValue: (base) => ({
                        ...base,
                        color: '#D1D5DB', // Ensure the text is colored properly
                        }),
                        input: (base) => ({
                        ...base,
                        color: '#D1D5DB', // Ensure the input text is also colored
                        }),
                        menu: (base) => ({
                        ...base,
                        backgroundColor: '#1F2937', // Dark mode background for dropdown
                        color: '#D1D5DB', // Text color for dropdown options
                        zIndex: 9999, // Ensure the dropdown appears above other elements if needed
                        }),
                        option: (base) => ({
                        ...base,
                        backgroundColor: '#1F2937', // Background color for each option
                        color: '#D1D5DB', // Text color for each option
                        padding: '0.5rem', // Adjust padding for consistency
                        '&:hover': {
                            backgroundColor: '#4B5563', // Hover effect for options
                            color: '#F3F4F6', // Text color when hovering
                        }
                        }),
                }}
            />
          )}
        />
        {errors.medicine && (
          <p className="text-red-600 text-sm mt-1">{errors.medicine.message}</p>
        )}
      </div>

      {/* Week Start */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date de début de semaine
        </label>
        <input
          type="date"
          {...register('week_start', { required: 'Date de début requise' })}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {errors.week_start && (
          <p className="text-red-600 text-sm mt-1">{errors.week_start.message}</p>
        )}
      </div>

      {/* Week End */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date de fin de semaine
        </label>
        <input
          type="date"
          {...register('week_end', { required: 'Date de fin requise' })}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {errors.week_end && (
          <p className="text-red-600 text-sm mt-1">{errors.week_end.message}</p>
        )}
      </div>

      {/* Quantity Used */}
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
          className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {errors.quantity_used && (
          <p className="text-red-600 text-sm mt-1">
            {errors.quantity_used.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium disabled:opacity-60"
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
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 font-medium">{message}</p>
      )}
    </form>
  );
};

export default WeeklyReportForm;
