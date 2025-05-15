import React, { useState } from 'react';
import { X } from 'lucide-react';
import { updateSettings } from '../../../../server/services/api';
import { EditSettingsModalProps } from '../../../../server/types';

export default function EditSettingsModal({ setting, onClose, onSuccess, location }: EditSettingsModalProps) {
  const [wartosc, setWartosc] = useState(setting.wartosc);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateSettings(location, { id: setting.id, wartosc });
      onSuccess();
      onClose();
    } catch (err) {
      setError('Wystąpił błąd podczas aktualizacji ustawienia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edytuj ustawienie</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Klucz</label>
            <input
              type="text"
              name="klucz"
              value={setting.klucz}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Wartość</label>
            {setting.id === 1 ? (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={wartosc === 'true'}
                  onChange={(e) => setWartosc(e.target.checked.toString())}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
              </label>
            ) : (
              <input
                type="text"
                name="wartosc"
                value={wartosc}
                onChange={e => setWartosc(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              disabled={isSubmitting}
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}