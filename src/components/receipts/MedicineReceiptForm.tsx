import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { createMedicineReceipt } from '../../services/medicineReceiptService';
import { fetchCenters, fetchMedicines } from '../../services/stockService';
import { Center, Medicine } from '../../types';

interface FormData {
  center: string;
  medicine: string;
  quantity_received: string;
  exp_date: Date;
  received_date: Date;
}

type OptionType = { value: number; label: string };

const MedicineReceiptForm: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      exp_date: new Date(),
      received_date: new Date(),
    },
  });

  const selectedCenter = watch('center');

  useEffect(() => {
    fetchCenters().then(setCenters);
    fetchMedicines().then(setMedicines);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage('');
    console.log("submission data");
    console.log(data)
    try {
      await createMedicineReceipt({
        center: parseInt(data.center),
        medicine: parseInt(data.medicine),
        quantity_received: parseInt(data.quantity_received),
        exp_date: data.exp_date.toISOString().split('T')[0],
        received_date: data.received_date.toISOString().split('T')[0],
      });
      console.log("medicine reciption creation ...")
      console.log(data);
      setMessage('✅ Entrée enregistrée avec succès.');
      // Keep center, reset other fields
      // resetField('medicine');
      resetField('exp_date');
      resetField('quantity_received');
    } catch (error) {
      setMessage('❌ Erreur lors de l’enregistrement.');
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
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4 sm:p-6 md:p-8 space-y-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ajouter une entrée de stock</h2>

      {/* Center Select */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Centre médical</label>
        <select
          {...register('center', { required: 'Centre requis' })}
          className="w-full border dark:border-gray-600 p-2 rounded text-sm dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="">-- Choisir un centre --</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
        {errors.center && <p className="text-red-600 text-sm">{errors.center.message}</p>}
      </div>

      {/* Medicine Select */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Médicament</label>
        <Controller
            name="medicine"
            control={control}
            rules={{ required: 'Médicament requis' }}
            render={({ field }) => (
                <Select<OptionType>
                options={medicineOptions}
                isSearchable
                placeholder="-- Choisir un médicament --"
                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                value={medicineOptions.find((option) => option.value === Number(field.value))}
                className="text-sm w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
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
        {errors.medicine && <p className="text-red-600 text-sm">{errors.medicine.message}</p>}
      </div>

      {/* Quantity */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Quantité reçue</label>
        <input
          type="number"
          min={1}
          {...register('quantity_received', {
            required: 'Quantité requise',
            min: { value: 1, message: 'Quantité minimale: 1' },
          })}
          className="w-full border dark:border-gray-600 p-2 rounded text-sm dark:bg-gray-700 dark:text-gray-200"
        />
        {errors.quantity_received && (
          <p className="text-red-600 text-sm">{errors.quantity_received.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          {/* Date de réception */}
          <div className="flex flex-col lg:flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Date de réception
            </label>
            <Controller
              name="received_date"
              control={control}
              rules={{ required: 'Date requise' }}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border dark:border-gray-600 p-2 rounded text-sm dark:bg-gray-700 dark:text-gray-200"
                  placeholderText="jj/mm/aaaa"
                />
              )}
            />
            {errors.received_date && (
              <p className="text-red-600 text-sm">{errors.received_date.message}</p>
            )}
          </div>

          {/* Date d'expiration */}
          <div className="flex flex-col lg:flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Date d'expiration
            </label>
            <Controller
              name="exp_date"
              control={control}
              rules={{ required: 'Date requise' }}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border dark:border-gray-600 p-2 rounded text-sm dark:bg-gray-700 dark:text-gray-200"
                  placeholderText="jj/mm/aaaa"
                />
              )}
            />
            {errors.exp_date && (
              <p className="text-red-600 text-sm">{errors.exp_date.message}</p>
            )}
          </div>
        </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60 text-sm dark:bg-blue-500 dark:hover:bg-blue-600"
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
      {message && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{message}</p>}
    </form>
  );
};

export default MedicineReceiptForm;
