import { useState, useEffect, useCallback } from 'react';
import { getDeliveryRules } from '../services/api';
import { DeliveryRuleResponse } from '../types';


export function useDeliveryRules(location: string) {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    try {
      const weekdayRules = await getDeliveryRules('dostawaweekday', location);
      const weekendRules = await getDeliveryRules('dostawaweekend', location);

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
  }, [location]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  return { rules, loading, error, refetch: fetchRules };
}
