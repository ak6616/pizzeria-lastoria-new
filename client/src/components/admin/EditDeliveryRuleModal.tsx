import React, { useState } from 'react';
import { X } from 'lucide-react';
import { updateDeliveryRule } from '../../../../server/services/api';
import { EditDeliveryRuleModalProps } from '../../../../server/types';


export default function EditDeliveryRuleModal({
  rule,
  onClose,
  onSuccess,
  location,
}: EditDeliveryRuleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      id: rule.id,
      category: rule.uniqueId?.split('_')[0] || rule.category,
      nazwa: formData.get('nazwa') as string,
      ulica: formData.get('ulica') as string,
      ilosc: parseInt(formData.get('ilosc') as string),
      koszt: parseFloat(formData.get('koszt') as string),
    };

    try {
      await updateDeliveryRule(data, location);
      onSuccess();
    } catch (err) {
      setError('Wystąpił błąd podczas aktualizacji reguły dostawy');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edytuj regułę dostawy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nazwa *</label>
            <input
              type="text"
              name="nazwa"
              defaultValue={rule.nazwa}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ulica</label>
            <input
              type="text"
              name="ulica"
              defaultValue={rule.ulica}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ilość *</label>
            <input
              type="number"
              name="ilosc"
              defaultValue={rule.ilosc}
              required
              min="0"
              step="0.01"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Koszt (zł) *
            </label>
            <input
              type="number"
              name="koszt"
              defaultValue={rule.koszt}
              required
              min="0"
              step="0.01"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
