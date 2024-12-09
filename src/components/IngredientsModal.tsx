import React from 'react';
import { X } from 'lucide-react';

interface IngredientsModalProps {
  item: {
    uniqueId: string;
    nazwa: string;
    skladniki?: string;
    category?: string;
  };
  customization: {
    removedIngredients: string[];
    addedIngredients: (string | number)[];
  };
  onClose: () => void;
  onToggleIngredient: (uniqueId: string, ingredient: string) => void;
  onToggleAdditionalIngredient: (uniqueId: string, ingredientId: number) => void;
  additionalIngredients: Array<{
    id: number;
    nazwa: string;
    cena: number;
  }>;
}

export default function IngredientsModal({
  item,
  customization,
  onClose,
  onToggleIngredient,
  onToggleAdditionalIngredient,
  additionalIngredients
}: IngredientsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edytuj składniki - {item.nazwa}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {item.skladniki && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Usuń składniki:</p>
            <div className="flex flex-wrap gap-2">
              {item.skladniki.split(', ').map((ingredient: string) => (
                <label key={ingredient} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={customization.removedIngredients.includes(ingredient)}
                    onChange={() => onToggleIngredient(item.uniqueId, ingredient)}
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="ml-2 text-sm">{ingredient}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {item.category?.includes('pizza') && (
          <div>
            <p className="text-sm font-medium mb-2">Dodatkowe składniki:</p>
            <div className="flex flex-wrap gap-2">
              {additionalIngredients.map((ingredient) => (
                <label key={ingredient.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={customization.addedIngredients.includes(ingredient.id)}
                    onChange={() => onToggleAdditionalIngredient(item.uniqueId, ingredient.id)}
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="ml-2 text-sm">
                    {ingredient.nazwa} (+{ingredient.cena} zł)
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
} 