
import ImageGallery from '../../server/components/ImageGallery';

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Galeria</h1>
      <ImageGallery />
    </div>
  );
}