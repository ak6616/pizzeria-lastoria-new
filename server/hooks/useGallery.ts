import { useState, useEffect, useCallback } from 'react';
import { getGalleryImages } from '../services/api';

export interface GalleryImage {
  id: number;
  link: string;
}

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryImages = useCallback(async () => {
    try {
      const data = await getGalleryImages();
      setImages(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować galerii');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  return { images, loading, error, refetch: fetchGalleryImages };
}
