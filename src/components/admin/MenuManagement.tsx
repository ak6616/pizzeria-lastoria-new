import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useMenuItems } from '../../hooks/useMenuItems';
import AddMenuItemModal from './AddMenuItemModal';
import EditMenuItemModal from './EditMenuItemModal';
import { deleteMenuItem } from '../../services/api';

export default function MenuManagement() {
  const { items, loading, error, refetch } = useMenuItems();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleDelete = async (category: string, id: number) => {
    const categoryMapping: Record<string, string> = {
      pizza: 'pizza',
      fastfood: 'fastfood',
      napoje: 'napoje',
      dodatki: 'dodatki'
    };

    const tableCategory = categoryMapping[category];
    if (!tableCategory) {
      alert('Nieprawidłowa kategoria produktu');
      return;
    }

    if (window.confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
      try {
        await deleteMenuItem(tableCategory, id);
        await refetch();
      } catch (err) {
        console.error('Error deleting menu item:', err);
        alert('Wystąpił błąd podczas usuwania pozycji');
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
        Wystąpił błąd podczas ładowania menu
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Dodaj pozycję
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(items).map(([category, categoryItems]) =>
          categoryItems.map((item) => (
            <div
              key={item.uniqueId}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.nazwa}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {category}
                    </span>
                  </div>
                  {item.skladniki && (
                    <p className="text-sm text-gray-600 mt-1">{item.skladniki}</p>
                  )}
                  <p className="text-sm font-semibold mt-2">{item.cena} zł</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1 text-blue-500 hover:text-blue-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category, item.id)}
                    className="p-1 text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <AddMenuItemModal
          onClose={() => setShowAddModal(false)}
          onSuccess={async () => {
            setShowAddModal(false);
            await refetch();
          }}
        />
      )}

      {editingItem && (
        <EditMenuItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={async () => {
            setEditingItem(null);
            await refetch();
          }}
        />
      )}
    </div>
  );
}