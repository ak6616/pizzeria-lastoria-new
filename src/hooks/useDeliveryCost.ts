import { useState, useEffect } from 'react';
import { calculateDeliveryCost } from '../services/api';

export function useDeliveryCost(city: string, street: string, pizzaCount: number) {
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeliveryCost() {
      if (!city) {
        setDeliveryCost(null);
        setError(null);
        return;
      }

      try {
        const response = await calculateDeliveryCost(city, street, pizzaCount, 'miejsce-piastowe');
        if (response.message) {
          setError(response.message);
          setDeliveryCost(null);
        } else {
          setDeliveryCost(response.cost);
          setError(null);
        }
      } catch (err) {
        setError('Błąd podczas obliczania kosztu dostawy');
        setDeliveryCost(null);
      }
    }

    fetchDeliveryCost();
  }, [city, street, pizzaCount]);

  return { deliveryCost, error };
}