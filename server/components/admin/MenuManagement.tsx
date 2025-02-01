import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useMenuItems } from '../../hooks/useMenuItems';
import AddMenuItemModal from './AddMenuItemModal';
import EditMenuItemModal from './EditMenuItemModal';
import { deleteMenuItem } from '../../services/api';

const CATEGORY_NAMES: Record<string, string> = {
  pizza: 'Pizza',
  fastfood: 'Fast Food',
  napoje: 'Napoje',
  dodatki: 'Dodatki'
};

const CATEGORY_ORDER = ['pizza', 'fastfood', 'dodatki', 'napoje'];

interface MenuManagementProps {
  location: string;
}

export default function MenuManagement({ location }: MenuManagementProps) {
  const { items, loading, error, refetch } = useMenuItems(location);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleDelete = async (category: string, id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
      try {
        await deleteMenuItem(category, id, location);
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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Dodaj pozycję
        </button>
      </div>

      {CATEGORY_ORDER.map(category => (
        items[category]?.length > 0 && (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-yellow-600">
              {CATEGORY_NAMES[category]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items[category].map((item) => (
                <div
                  key={item.uniqueId}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.nazwa}</h4>
                      {item.skladniki && (
                        <p className="text-sm text-gray-600 mt-1">{item.skladniki}</p>
                      )}
                      <p className="text-sm font-semibold mt-2">
                        {item.cena} zł
                      </p>
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
              ))}
            </div>
          </div>
        )
      ))}

      {showAddModal && (
        <AddMenuItemModal
          onClose={() => setShowAddModal(false)}
          onSuccess={async () => {
            setShowAddModal(false);
            await refetch();
          }}
          location={location}
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
          location={location}
        />
      )}
    </div>
  );
}