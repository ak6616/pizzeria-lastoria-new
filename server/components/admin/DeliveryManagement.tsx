import { useState } from 'react';
import React from 'react';

import { Edit2, Trash2, Plus } from 'lucide-react';
import { useDeliveryRules } from '../../hooks/useDeliveryRules';
import AddDeliveryRuleModal from './AddDeliveryRuleModal';
import EditDeliveryRuleModal from './EditDeliveryRuleModal';
import { deleteDeliveryRule } from '../../services/api';

const CATEGORY_NAMES: Record<string, string> = {
  dostawaweekend: 'Weekend',
  dostawaweekday: 'Dzień tygodnia'
};

const CATEGORY_ORDER = ['dostawaweekday', 'dostawaweekend'];

interface DeliveryManagementProps {
  location: string;
}

export default function DeliveryManagement({ location }: DeliveryManagementProps) {
  const { rules, loading, error, refetch } = useDeliveryRules(location);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const groupedRules = CATEGORY_ORDER.reduce((acc, category) => {
    acc[category] = rules.filter(rule => {
      const ruleCategory = rule.uniqueId.split('_')[0];
      return ruleCategory === category;
    });
    return acc;
  }, {} as Record<string, any[]>);

  const handleDelete = async (category: string, id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
      try {
        await deleteDeliveryRule(category, id);
        await refetch();
      } catch (err) {
        console.error('Error deleting menu item:', err);
        alert('Wystąpił błąd podczas usuwania pozycji');
      }
    }
  };

  const handleEdit = (rule: any) => {
    const editData = {
      ...rule,
      category: rule.uniqueId?.split('_')[0] || 'dostawaweekday'
    };
    setEditingItem(editData);
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
        Wystąpił błąd podczas ładowania tabeli dostawy
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tabela dostaw</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Dodaj pozycję
        </button>
      </div>

      {CATEGORY_ORDER.map(category => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-yellow-600">
            {CATEGORY_NAMES[category]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedRules[category]?.map((rule) => (
              <div
                key={rule.uniqueId}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rule.nazwa}</h3>
                    </div>
                    {rule.ulica && (
                      <p className="text-sm text-gray-600 mt-1">{rule.ulica}</p>
                    )}
                    <p className="text-sm font-semibold mt-2">
                      Minimalna ilość: {rule.ilosc} szt
                    </p>
                    <p className="text-sm font-semibold mt-2">
                      Koszt dostawy: {rule.koszt} zł
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(rule)}
                      className="p-1 text-blue-500 hover:text-blue-600 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category, rule.id)}
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
      ))}

      {showAddModal && (
        <AddDeliveryRuleModal
          onClose={() => setShowAddModal(false)}
          onSuccess={async () => {
            setShowAddModal(false);
            await refetch();
          }}
          location={location}
        />
      )}

      {editingItem && (
        <EditDeliveryRuleModal
          rule={editingItem}
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
