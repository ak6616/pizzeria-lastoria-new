import { useState, useEffect } from 'react';
import { calculateDeliveryCost } from '../services/api';

export function useDeliveryCost(city: string, street: string, pizzaCount: number) {
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDeliveryCost() {
      if (!city) {
        setDeliveryCost(null);
        setError(null);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const { cost, message } = await calculateDeliveryCost(city, street, pizzaCount);
        if (message) {
          setError(message);
          setDeliveryCost(null);
        } else {
          setDeliveryCost(cost);
          setError(null);
        }
      } catch (err) {
        setError('Błąd podczas obliczania kosztu dostawy');
        setDeliveryCost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveryCost();
  }, [city, street, pizzaCount]);

  return { deliveryCost, error, loading };
}