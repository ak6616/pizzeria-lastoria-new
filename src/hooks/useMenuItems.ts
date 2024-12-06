import { useState, useEffect, useCallback } from 'react';
import { getMenuItems, getAdditionalIngredients } from '../services/api';

export interface MenuItem {
  uniqueId: string;
  id: number;
  nazwa: string;
  cena: number;
  skladniki?: string;
  category: string;
}

export interface AdditionalIngredient {
  id: number;
  nazwa: string;
  cena: number;
}

export function useMenuItems() {
  const [items, setItems] = useState<Record<string, MenuItem[]>>({
    pizza: [],
    fastfood: [],
    napoje: [],
  });
  const [additionalIngredients, setAdditionalIngredients] = useState<AdditionalIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMenuItems = useCallback(async () => {
    try {
      const [pizza, fastfood, napoje, dodatki] = await Promise.all([
        getMenuItems('pizza'),
        getMenuItems('fastfood'),
        getMenuItems('napoje'),
        getAdditionalIngredients(),
      ]);

      const processedItems = {
        pizza: pizza.map(item => ({
          ...item,
          category: 'pizza',
          uniqueId: `pizza_${item.id}`
        })),
        fastfood: fastfood.map(item => ({
          ...item,
          category: 'fastfood',
          uniqueId: `fastfood_${item.id}`
        })),
        napoje: napoje.map(item => ({
          ...item,
          category: 'napoje',
          uniqueId: `napoje_${item.id}`
        })),
      };

      setItems(processedItems);
      setAdditionalIngredients(dodatki);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować menu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllMenuItems();
  }, [fetchAllMenuItems]);

  return { items, additionalIngredients, loading, error, refetch: fetchAllMenuItems };
}