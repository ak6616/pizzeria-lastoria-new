import { useState } from 'react';
import React from 'react';

import { Edit2, Trash2, Plus } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import AddNewsModal from './AddNewsModal';
import EditNewsModal from './EditNewsModal';
import { deleteNews } from '../../services/api';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export default function NewsManagement() {
  const { articles, loading, error, refetch } = useNews();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  const handleDelete = async (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę aktualność?')) {
      try {
        await deleteNews(id);
        await refetch();
      } catch (err) {
        console.error('Error deleting news:', err);
        alert('Wystąpił błąd podczas usuwania aktualności');
      }
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
        Wystąpił błąd podczas ładowania aktualności
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

      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
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