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

interface DeliveryRuleResponse {
  id: number;
  nazwa: string;
  ulica?: string;
  ilosc: number;
  koszt: number;
}

export function useDeliveryRules() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    try {
      const weekdayRules = await getDeliveryRules('dostawaweekday', 'miejsce-piastowe');
      const weekendRules = await getDeliveryRules('dostawaweekend', 'miejsce-piastowe');

      const formattedRules = [
        ...weekdayRules.map((rule: DeliveryRuleResponse) => ({
          ...rule,
          uniqueId: `dostawaweekday_${rule.id}`
        })),
        ...weekendRules.map((rule: DeliveryRuleResponse) => ({
          ...rule,
          uniqueId: `dostawaweekend_${rule.id}`
        }))
      ];

      setRules(formattedRules);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować zasad dostawy');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  return { rules, loading, error, refetch: fetchRules };
}