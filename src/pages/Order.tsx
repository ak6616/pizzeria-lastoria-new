import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import { getDeliveryAreas } from '../services/api';
import { MapPin, Home } from 'lucide-react';

interface DeliveryArea {
  id: number;
  nazwa: string;
  ulica: string;
}

export default function Order() {
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeliveryAreas() {
      try {
        const areas = await getDeliveryAreas('miejsce-piastowe');
        setDeliveryAreas(areas);
      } catch (err) {
        setError('Nie udało się załadować listy obszarów dostawy');
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveryAreas();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Zamów online
      </h1>

      <div className="bg-white/90 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Dowozimy do:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveryAreas.map((area) => (
            <div key={area.id} className="flex flex-col">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span className="font-medium">{area.nazwa}</span>
              </div>
              {area.ulica && (
                <div className="flex items-center gap-2 ml-4 mt-1">
                  <Home className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    ul. {area.ulica}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <OrderForm deliveryAreas={deliveryAreas} />
    </div>
  );
}
