import { useState, useEffect, useCallback } from 'react';
import { getDeliveryRules } from '../services/api';

export interface DeliveryRule {
  uniqueId: string;
  id: number;
  nazwa: string;
  ulica?: string;
  ilosc: number;
  koszt: number;
}

export function useDeliveryRules() {
  const [rules, setRules] = useState<Record<string, DeliveryRule[]>>({
    dostawaweekend: [],
    dostawaweekday: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllDeliveryRules = useCallback(async () => {
    try {
      const [dostawaweekday, dostawaweekend] = await Promise.all([
        getDeliveryRules('dostawaweekday'),
        getDeliveryRules('dostawaweekend'),
      ]);

      const processedRules = {
        weekday: dostawaweekday.map((rule) => ({
          ...rule,
          category: 'dostawaweekday',
          uniqueId: `weekday_${rule.id}`,
        })),
        weekend: dostawaweekend.map((rule) => ({
          ...rule,
          category: 'dostawaweekend',
          uniqueId: `weekend_${rule.id}`,
        })),
      };

      setRules(processedRules);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować regół dowozu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllDeliveryRules();
  }, [fetchAllDeliveryRules]);

  return { rules, loading, error, refetch: fetchAllDeliveryRules };
}
