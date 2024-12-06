import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import { getDeliveryAreas } from '../services/api';

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
        const areas = await getDeliveryAreas();
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
        <ul className="grid grid-cols-3 gap-4 list-disc list-inside">
          {deliveryAreas.map((area) => (
            <li key={area.id}>
              {area.nazwa} {area.ulica ? <span>ul. {area.ulica}</span> : null}
            </li>
          ))}
        </ul>
      </div>

      <OrderForm deliveryAreas={deliveryAreas} />
    </div>
  );
}
