import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery } from '../hooks/useGallery';

export default function ImageGallery() {
  const { images, loading, error } = useGallery();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.img
            key={image.id}
            src={image.link}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImageIndex(index)}
          />
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
              transition={{ type: "spring", duration: 0.3 }}
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
    </div>
  );
}