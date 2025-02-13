import { useState, useEffect, useCallback } from 'react';
import { getOrders } from '../services/api';
import { Order}  from '../components/admin/OrdersManagement.tsx';
import { Orders } from '../types/index.ts';


export function useOrders(location: string) {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getOrders(location);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować listy zamówień');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}
