import React, { useState } from 'react';
import { X } from 'lucide-react';
import { updateSettings } from '../../services/api';
import { EditSettingsModalProps, Setting } from '../../types';
import { useSettings } from '../../hooks/useSettings';


export default function EditNewsModal({ setting, onClose, onSuccess, location }: EditSettingsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const { settings, loading, refetch } = useSettings(location);
  
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      id: setting.id,
      klucz: formData.get('klucz') as string,
      wartosc: formData.get('wartosc') as string,
    };

    try {
      await updateSettings(location, data);
      onSuccess();
    } catch (err) {
      setError('Wystąpił błąd podczas aktualizacji aktualności');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Wystąpił błąd podczas ładowania ustawień
      </div>
    );
  }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Aktualności</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            Dodaj aktualność
          </button>
        </div>
  
        
  
        {showAddModal && (
          <AddNewsModal
            onClose={() => setShowAddModal(false)}
            onSuccess={async () => {
              setShowAddModal(false);
              await refetch();
            }}
          />
        )}
  
        {editingArticle && (
          <EditNewsModal
            article={editingArticle}
            onClose={() => setEditingArticle(null)}
            onSuccess={async () => {
              setEditingArticle(null);
              await refetch();
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edytuj ustawienia</h2>
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
        <div className="space-y-4">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{article.tytul}</h3>
                  <time className="text-sm text-gray-500 block mt-1">
                    {format(new Date(article.data), 'd MMMM yyyy', { locale: pl })}
                  </time>
                  <p className="mt-2 text-gray-600 whitespace-pre-line">
                    {article.tekst}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="p-1 text-blue-500 hover:text-blue-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-1 text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </form>
      </div>
    </div>
  );
}