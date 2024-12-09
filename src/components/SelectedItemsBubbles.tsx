import React from 'react';
import SelectedItemBubble from './SelectedItemBubble';

interface SelectedItemsBubblesProps {
  items: Array<{
    uniqueId: string;
    nazwa: string;
    skladniki?: string;
    category?: string;
    instanceId: string;
  }>;
  onEditIngredients: (uniqueId: string, instanceId: string) => void;
  onRemoveItem: (uniqueId: string, instanceId: string) => void;
}

export default function SelectedItemsBubbles({
  items,
  onEditIngredients,
  onRemoveItem
}: SelectedItemsBubblesProps) {
  if (items.length === 0) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto p-2">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <SelectedItemBubble
              key={item.instanceId}
              item={item}
              onEditIngredients={onEditIngredients}
              onClose={onRemoveItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 