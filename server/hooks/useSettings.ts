import { useState, useEffect, useCallback } from 'react';
import { getSettings } from '../services/api';
import { Setting } from '../types';



export function useSettings(location: string) {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await getSettings(location);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować aktualności');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, error, refetch: fetchSettings };
}