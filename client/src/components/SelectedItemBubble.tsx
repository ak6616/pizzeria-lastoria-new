import { Edit2, X } from 'lucide-react';
import React from 'react';
import { SelectedItemBubbleProps } from '../../../server/types';



export default function SelectedItemBubble({ item, onEditIngredients, onClose }: SelectedItemBubbleProps) {
  const canEdit = item.skladniki || item.category?.includes('pizza') || item.category?.includes('fastfood');

  return (
    <div className="bg-white/95 rounded-lg shadow-lg p-3 flex items-center justify-between gap-2">
      <div>
        <span className="font-medium">{item.nazwa}</span>
      </div>
      <div className="flex items-center gap-2">
        {canEdit && (
          <button
            onClick={() => onEditIngredients(item.uniqueId, item.instanceId)}
            className="text-blue-500 hover:text-blue-600 transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onClose(item.uniqueId, item.instanceId)}
          className="text-gray-500 hover:text-gray-600 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 