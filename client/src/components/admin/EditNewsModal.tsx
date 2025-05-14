import React, { useState } from 'react';
import { X } from 'lucide-react';
import { updateNews } from '../../../../server/services/api';
import { EditNewsModalProps, NewsArticle } from '../../../../server/types';


export default function EditNewsModal({ article, onClose, onSuccess }: EditNewsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      id: article.id,
      tytul: formData.get('tytul') as string,
      tekst: formData.get('tekst') as string,
      data: article.data,
    };

    try {
      await updateNews(data);
      onSuccess();
    } catch (err) {
      setError('Wystąpił błąd podczas aktualizacji aktualności');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edytuj aktualność</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
            <label className="block text-sm font-medium mb-1">
              Tytuł *
            </label>
            <input
              type="text"
              name="tytul"
              defaultValue={article.tytul}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Treść *
            </label>
            <textarea
              name="tekst"
              defaultValue={article.tekst}
              required
              rows={5}
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