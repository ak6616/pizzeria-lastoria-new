import { useState, useEffect, useCallback } from 'react';
import { getMenuItems, getAdditionalIngredients } from '../../../server/services/api';
import { MenuItem, AdditionalIngredient } from '../../../server/types';



type LocationSuffix = '_mp' | '_hacz';

export function useMenuItems(location?: string) {
  const [items, setItems] = useState<Record<string, MenuItem[]>>({
    pizza: [],
    fastfood: [],
    napoje: [],
    dodatki: [],
  });
  const [additionalIngredients, setAdditionalIngredients] = useState<AdditionalIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocationSuffix = (loc: string): LocationSuffix => {
    switch (loc) {
      case 'miejsce-piastowe':
        return '_mp';
      case 'haczow':
        return '_hacz';
      default:
        return '_mp'; // domyślnie Miejsce Piastowe
    }
  };

  const fetchAllMenuItems = useCallback(async () => {
    if (!location) {
      setLoading(false);
      return;
    }

    const suffix = getLocationSuffix(location);

    try {
      const [pizza, fastfood, napoje, dodatki, additionalIngs] = await Promise.all([
        getMenuItems(`pizza${suffix}`),
        getMenuItems(`fastfood${suffix}`),
        getMenuItems(`napoje${suffix}`),
        getMenuItems(`dodatki${suffix}`),
        getAdditionalIngredients(location),
      ]);

      const processedItems = {
        pizza: pizza.map((item: any) => ({
          ...item,
          category: `pizza${suffix}`,
          uniqueId: `pizza${suffix}_${item.id}`
        })),
        fastfood: fastfood.map((item: any) => ({
          ...item,
          category: `fastfood${suffix}`,
          uniqueId: `fastfood${suffix}_${item.id}`
        })),
        napoje: napoje.map((item: any) => ({
          ...item,
          category: `napoje${suffix}`,
          uniqueId: `napoje${suffix}_${item.id}`
        })),
        dodatki: dodatki.map((item: any) => ({
          ...item,
          category: `dodatki${suffix}`,
          uniqueId: `dodatki${suffix}_${item.id}`
        })),
      };

      setItems(processedItems);
      setAdditionalIngredients(additionalIngs);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować menu');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchAllMenuItems();
  }, [fetchAllMenuItems]);

  return { items, additionalIngredients, loading, error, refetch: fetchAllMenuItems };
}