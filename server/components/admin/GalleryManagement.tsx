import { useState } from 'react';
import React from 'react';

import { Trash2, Plus } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import AddGalleryItemModal from './AddGalleryItemModal';
import { deleteGalleryImage } from '../../services/api';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { images, loading, error, refetch } = useGallery();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center text-white py-8">
        <p>Brak zdjęć w galerii</p>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten obraz?')) {
      try {
        await deleteGalleryImage(id);
        await refetch();
      } catch (err) {
        console.error('Error deleting gallery item:', err);
        alert('Wystąpił błąd podczas usuwania zdjęcia');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Wystąpił błąd podczas ładowania galerii
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Galeria</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Dodaj grafikę
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="relative">
            <motion.img
              src={image.link}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImageIndex(index)}
            />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-600 shadow transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white p-2 rounded-full bg-black/20 hover:bg-black/40"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <motion.img
              key={selectedImageIndex}
              src={images[selectedImageIndex].link}
              alt="Enlarged view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.3 }}
            />

            <button
              onClick={handleNext}
              className="absolute right-4 text-white p-2 rounded-full bg-black/20 hover:bg-black/40"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {showAddModal && (
          <AddGalleryItemModal
            onClose={() => setShowAddModal(false)}
            onSuccess={async () => {
              setShowAddModal(false);
              await refetch();
            }}
          />
        )}
      </div>
    </div>
  );
}
