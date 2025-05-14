import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { useGallery } from '../../../server/hooks/useGallery';

const locations = [
  {
    name: 'Haczów',
    address: 'Haczów 585',
    phone: '13 33 350 07',
    mobile: '601 463 446',
    mapsUrl:
      'https://www.google.com/maps/place/Pizzeria+Lastoria/@49.6682919,21.8902343,17z/data=!4m15!1m8!3m7!1s0x473c4402928594b9:0xc63f4d62a9ea108b!2zSGFjesOzdyA1ODYsIDM2LTIxMyBIYWN6w7N3!3b1!8m2!3d49.6682919!4d21.8902343!16s%2Fg%2F11sqf52_jv!3m5!1s0x473c44028ef3868f:0x2aa91fc1c25f28d5!8m2!3d49.6680069!4d21.8903126!16s%2Fg%2F11dfjy87hz?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Miejsce Piastowe',
    address: 'ul. Krośnieńska 1',
    phone: '13 43 393 34',
    mobile: '727 598 727',
    mapsUrl:
      'https://www.google.com/maps/place/Pizzeria+Lastoria/@49.6349567,21.7814811,17z/data=!3m1!4b1!4m6!3m5!1s0x473c47b986f7399d:0x12a70f0fa61ccade!8m2!3d49.6349533!4d21.786352!16s%2Fg%2F1tfkdc0_?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D',
  },
];

export default function Home() {
  const controls = useAnimationControls();
  const { images, loading } = useGallery();

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        x: [0, -400 * (images.length - 1), 0],
        transition: {
          duration: 120,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };
    
    if (images.length > 0) {
      animate();
    }
  }, [controls, images]);

  return (
    <div className="text-center text-white">
      <div className="max-w-4xl mx-auto">
        <img src="/zdjecia/logo.png" className="h-[200px] w-[200px] mx-auto mb-8" />
        <h1 className="text-5xl font-bold mb-6">Pizzeria Lastoria</h1>

        <div className="mb-12 overflow-hidden">
          {!loading && (
            <motion.div 
              className="flex space-x-4"
              animate={controls}
            >
              {[...images, ...images].map((image, index) => (
                <motion.img
                  key={index}
                  src={image.link}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-[400px] h-64 object-cover rounded-lg flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                />
              ))}
            </motion.div>
          )}
        </div>

        <div className="bg-white/10 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Ponad 20 lat doświadczenia
          </h2>
          <p className="text-lg mb-6">
            Od 2003 roku dostarczamy najwyższej jakości pizzę, łącząc tradycyjne
            włoskie receptury z lokalnymi smakami. Nasze wieloletnie
            doświadczenie pozwala nam tworzyć wyjątkowe dania, które zachwycają
            podniebienia naszych gości.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <motion.a
              key={location.name}
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-6 rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
              <p>{location.address}</p>
              <p>Tel: {location.phone}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
