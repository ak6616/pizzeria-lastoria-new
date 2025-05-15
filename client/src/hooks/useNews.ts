import { useState, useEffect, useCallback } from 'react';
import { getNews } from '../services/api';
import { NewsArticle } from '../types';



export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const data = await getNews();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować aktualności');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, refetch: fetchNews };
}