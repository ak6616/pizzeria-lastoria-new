import { useState, useEffect, useCallback } from 'react';
import { getOrders } from '../services/api';

export interface Orders {
  id: number;
  imie: string;
  nazwisko: string;
  miejscowosc: string;
  ulica?: string;
  numerDomu: string;
  numerMieszkania?: string;
  numerTelefonu: string;
  dataGodzinaZamowienia: string;
  zamowienieNaGodzine?: string;
  zamowioneProdukty: string;
  suma: number;
}

export function useOrders() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować listy zamówień');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}
